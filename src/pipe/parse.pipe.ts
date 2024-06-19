import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../enum/http.status";

export class ParsePipe {
  public static parseIdPipe(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "El parametro debe ser un número" });
    next();
  }
}
