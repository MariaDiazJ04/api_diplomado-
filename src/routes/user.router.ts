import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";
import { UserMiddleware } from "../middleware/user.middleware";
import { ParsePipe } from "../pipe/parse.pipe";

export class UserRouter {
  public router: Router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    const userController = new UserController(new UserService());

    this.router.get("/users", (req: Request, res: Response) => {
      userController.getAllUsers(req, res);
    });

    this.router.get(
      "/users/:id",
      (req: Request, res: Response, next: NextFunction) => {
        ParsePipe.parseIdPipe(req, res, next);
      },
      (req: Request, res: Response) => {
        userController.getUsersById(req, res);
      }
    );

    this.router.post(
      "/users",
      (req: Request, res: Response, next: NextFunction) => {
        UserMiddleware.validateUserDto(req, res, next);
      },
      (req: Request, res: Response) => {
        userController.createUser(req, res);
      }
    );

    this.router.put(
      "/users/:id",
      (req: Request, res: Response, next: NextFunction) => {
        UserMiddleware.validateUserDto(req, res, next);
      },
      (req: Request, res: Response, next: NextFunction) => {
        ParsePipe.parseIdPipe(req, res, next);
      },
      (req: Request, res: Response) => {
        userController.updateUser(req, res);
      }
    );

    this.router.delete(
      "/users/:id",
      (req: Request, res: Response, next: NextFunction) => {
        ParsePipe.parseIdPipe(req, res, next);
      },
      (req: Request, res: Response) => {
        userController.deleteUser(req, res);
      }
    );
  }
}
