import { User, UserRole } from '../entity/User';
import { Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import {
  JsonController,
  Res,
  BodyParam,
  Post,
  NotFoundError, Authorized, Param, Body, QueryParam, Get, Req, UseBefore,
} from 'routing-controllers';
import config from "../config/security";
import { Inject } from 'typedi';
import { UserService } from '../services/UserService';
import { MailerService } from '../services/MailerService';
import {AuthorizedMiddleware} from "../middlewares/AuthorizedMiddleware";
import mailerConfig from '../config/mailer';
import { CurrentUser } from '../middlewares/decorators/CurrentUserDecorator';

@JsonController()
export class AuthenticationController {

  @Inject()
  private userService: UserService;

  @Inject()
  private mailerService: MailerService;

  @Post("/login")
  async login(@Req() request: Request,
              @Res() response: Response,
              @BodyParam("username", { required: true }) username: string,
              @BodyParam("password", { required: true }) password: string ) {

    const user = await this.userService.getByLogs(username, password);

    if(!user)
      throw new NotFoundError('Bad credentials');

    request.user = user;

    return user;
  }

  @Post("/signup")
  @Authorized(UserRole.ADMIN)
  async signUp(@Body({ validate: true }) user: User,
               @QueryParam('sendPassword') sendPassword: boolean) {

    const password = user.password;

    await this.userService.save(user);

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        config.jwtAccountConfirmationSecret,
        { expiresIn: "30d" }
    );

    let mailOptions = {
      template: 'welcome-onboard',
      message: {
        from: 'Alexis Mourlanne <alexis.mourlanne@gmail.com>',
        to: user.email,
      },
      locals: {
        userName: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: token,
        password: sendPassword ? password : '*'.repeat(password.length)
      }
    };

    await this.mailerService.sendMail(mailOptions);

    delete user.password;

    return user;
  }

  @Post("/account-confirmation")
  async verification(@QueryParam('token', { required: true }) token: string) {

    const user: User|undefined = await this.userService.getByToken(token, config.jwtAccountConfirmationSecret, false);

    if(!user)
      throw new Error('Not have account associate to this token.');

    if(!user.activated) {
      user.activated = true;
      await this.userService.save(user);
    }

    return user;
  }

  @Post("/password-reset")
  async passwordReset(@QueryParam("email", { required: true }) email: string) {

    const user: User|undefined = await this.userService.getOne({email});

    if(!user)
      return;

    const token = jwt.sign(
      { userId: user.id },
      config.jwtResetPasswordSecret,
      { expiresIn: "1h" }
    );

    let mailOptions = {
      template: 'password-reset',
      message: {
        from: mailerConfig.emailFrom,
        to: user.email,
      },
      locals: {
        userName: user.username,
        token: token
      }
    };
    const {response} = await this.mailerService.sendMail(mailOptions);
    return response;
  }

  @Post("/password-reset/confirmation")
  async passwordResetConfirmation(@QueryParam('token', { required: true }) token: string,
                                  @BodyParam('password', { required: true }) password: string,
                                  @BodyParam('confirmPassword', { required: true }) confirmPassword : string) {

    if (password !== confirmPassword)
      throw new Error('Password are not the same.');

    const user: User|undefined = await this.userService.getByToken(token, config.jwtResetPasswordSecret);

    if(!user)
      throw new Error('Not have account associate to this token.');

    user.password = password;
    user.hashPassword();

    await this.userService.save(user);

    return "Password succefully changed."
  }

  @Get("/account")
  @UseBefore(AuthorizedMiddleware)
  public async httpGetAccount(@CurrentUser({ required: true }) user: User)  {
    return user;
  }

  @Get("/authenticate")
  public async authenticate(@CurrentUser() user?: User) {
    return {
      authenticate: typeof user !== 'undefined',
      user: user
    };
  }
}
