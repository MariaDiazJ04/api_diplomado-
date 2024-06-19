import { Request, Response } from "express";
import { UserService } from "../service/user.service";
import { UserDto } from "../dto/user.dto";
import { HttpStatus } from "../enum/http.status";

export class UserController {
  constructor(private readonly userService: UserService) {}

  public async getAllUsers(req: Request, res: Response) {
    try {
      const result = await this.userService.getAllUsers();
      if (!result.rowCount)
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "No se encontraron resultados" });
      return res.status(HttpStatus.OK).json(result.rows);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async getUsersById(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const result = await this.userService.getUsersById(id);
      if (!result.rowCount)
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "No se encontraron resultados" });
      return res.status(HttpStatus.OK).json(result.rows);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async createUser(req: Request, res: Response) {
    const userDto = req.body as UserDto;
    try {
      const result = await this.userService.createUser(userDto);
      if (!result.rowCount)
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "No fue posible encontrar el recurso" });
      res.status(HttpStatus.CREATED).json(result.rows[0]);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async updateUser(req: Request, res: Response) {
    const userDto = req.body as UserDto;
    const id = Number(req.params.id);
    try {
      const result = await this.userService.updateUser(userDto, id);
      if (!result.rowCount)
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "No fue posible encontrar el recurso" });
      res.status(HttpStatus.OK).json(result.rows[0]);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const result = await this.userService.deleteUser(id);
      if (!result.rowCount)
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "No fue posible encontrar el recurso" });
      return res.status(HttpStatus.OK).json(result.rows[0]);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
