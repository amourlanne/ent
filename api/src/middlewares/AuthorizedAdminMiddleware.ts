import {NextFunction, Request, Response} from "express";
import {UserRole} from "../entity/User";
import {AuthorizedMiddleware} from "./AuthorizedMiddleware";

export class AuthorizedAdminMiddleware extends AuthorizedMiddleware {
  async use(request: any, response: Response, next: NextFunction) {
    return this.useWithRole(request, response, next, [UserRole.ADMIN])
  }
}
