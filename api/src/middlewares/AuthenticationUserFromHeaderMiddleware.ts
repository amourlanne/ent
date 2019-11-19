import { Middleware, ExpressMiddlewareInterface, CurrentUser } from 'routing-controllers';
import {NextFunction, Request, Response} from "express";
import { Inject } from 'typedi';
import { UserService } from '../services/UserService';
import securityConfig from '../config/security';

@Middleware({ type: "before", priority: 9 })
export class AuthenticationUserFromHeaderMiddleware implements ExpressMiddlewareInterface {

  @Inject()
  private userService: UserService;

  async use(request: Request, response: Response, next: NextFunction) {

    const token = request!.authInfo!.token;
    if(token) {
      request.user = await this.userService.getByToken(token, securityConfig.jwtAuthSecret);
    }
    next();
  }
}
