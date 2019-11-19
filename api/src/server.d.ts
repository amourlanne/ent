import { User } from './entity/User';

declare global {
  namespace Express {
    interface AuthInfo {
      token? : string;
      tokenPayload? : string;
      tokenSignature? : string;
    }

    interface Context {
      user?: User,
      organization?: Organization
    }

    interface Request {
      authInfo: AuthInfo;
      user?: User;
    }
  }
}
