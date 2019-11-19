import {Interceptor, InterceptorInterface, Action} from "routing-controllers";
import * as jwt from 'jsonwebtoken';
import config from '../config/security';
import authConfig from '../../config';

@Interceptor()
export class TokenCookieInterceptor implements InterceptorInterface {

  intercept({ request, response } : Action, content: any) {
    const { user } = request;
    if (user) {

      const jwtPayload = { userId: user.id, username: user.username };
      const jwtOptions = {/* expiresIn: "1h" */};

      const token = jwt.sign(jwtPayload, config.jwtAuthSecret, jwtOptions);

      const splitToken = token.split('.');
      const tokenSignature = splitToken.pop();
      const tokenPayload = splitToken.join('.');

      const expireIn = 1800000; // 30min

      const payloadCookieOptions = {
        // secure: true,
        sameSite: true,
        maxAge: expireIn
      };

      response.cookie(authConfig.tokenPayloadCookieName, tokenPayload, payloadCookieOptions);

      const signatureCookieOptions = {
        // secure: true,
        httpOnly: true,
        sameSite: true,
      };

      response.cookie(authConfig.tokenSignatureCookieName, tokenSignature, signatureCookieOptions);
    }
    return content;
  }

}
