import { NextFunction, Request, Response } from "express";
import { UserDto } from "../dto/user.dto";
import { validate } from "class-validator";
import { HttpStatus } from "../enum/http.status";

export class UserMiddleware {
  public static validateUserDto(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { names, lastnames, gender, email } = req.body as UserDto;

    const userDto = new UserDto();
    userDto.names = names;
    userDto.lastnames = lastnames;
    userDto.gender = gender;
    userDto.email = email;

    validate(userDto).then((error) => {
      if (error.length) return res.status(HttpStatus.BAD_REQUEST).json(error);
      next();
    });
  }
}
