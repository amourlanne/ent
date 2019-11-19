import { getCustomRepository, getRepository } from 'typeorm';
import { User, UserRole } from '../entity/User';
import { Request, Response } from 'express';
import {
  Get,
  JsonController,
  Post,
  Put,
  Req,
  Res,
  Body,
  Param,
  UseBefore,
} from 'routing-controllers';
import { UserRepository } from '../repository/UserRepository';
import { Inject } from 'typedi';
import { UserService } from '../services/UserService';
import {FormatResponse} from "../helpers/FormatResponse";
import { AuthorizedMiddleware } from '../middlewares/AuthorizedMiddleware';

@JsonController()
@UseBefore(AuthorizedMiddleware)
export class UserController {

  @Inject()
  private userService: UserService;

  @Post("/users")
  public async httpPost(@Req() request: Request, @Res() response: FormatResponse, @Body({ validate: true }) user: User)  {

    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.save(user);
  }

  @Get("/users")
  public async httpGet()  {
    return await this.userService.getAll();
  }

  @Put("/users")
  public async httpPut(@Req() request: Request, @Res() response: FormatResponse, @Body({ validate: true }) user: User)  {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.save(user);
  }

  @Get("/users/:username")
  public async httpGetByUsername(@Param("username") username: string) {
    return await this.userService.getByUsername(username);
  }

  // @Delete('/:id')
  // public httpDelete(
  //   @Param('id') id: string,
  // ): Promise<void> {
  //   return this.userService.delete(id);
  // }

}
