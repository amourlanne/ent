import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import globalConfig from '../../config';

@Middleware({ type: "before", priority: 10 })
export class AuthenticationInfoFromCookieMiddleware implements ExpressMiddlewareInterface {

  async use(request: Request, response: Response, next: NextFunction) {

    const tokenPayload = request.cookies[globalConfig.tokenPayloadCookieName];
    const tokenSignature = request.cookies[globalConfig.tokenSignatureCookieName];

    request.authInfo = {
      tokenPayload,
      tokenSignature,
    };

    if(tokenPayload && tokenSignature) {
      const token = tokenPayload.concat('.', tokenSignature);

      // request.headers.authorization = `JWT ${token}`;

      request.authInfo.token = token;

    }

    next();
  }
}
