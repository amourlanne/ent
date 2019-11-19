import {ExpressMiddlewareInterface} from 'routing-controllers';
import {NextFunction, Request, Response} from "express";
import {AuthenticationRequiredError} from "../error/AuthenticationRequiredError";
import {InvalidAuthenticationTokenError} from "../error/InvalidAuthenticationTokenError";
import {AccessDeniedError} from "../error/AccessDeniedError";

export class AuthorizedMiddleware implements ExpressMiddlewareInterface {

  async use(request: Request, response: Response, next: NextFunction) {
    return this.useWithRole(request, response, next,[])
  }

  async useWithRole(request: Request, response: Response, next: NextFunction, roles: string[]) {
    const { authInfo, user } = request;

    try {
      if (!authInfo.token) throw new AuthenticationRequiredError();
      if (!user) throw new InvalidAuthenticationTokenError();
      // @ts-ignore
      if (roles.length && !roles.includes(currentUser.role)) throw new AccessDeniedError();
    } catch (error) {
      next(error);
    }
    next();
  }
}
