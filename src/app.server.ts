import express, { Application, json, urlencoded } from "express";
import cors from "cors";
import { UserRouter } from "./routes/user.router";
import { environment } from "./config/environment";
import morgan from "morgan";

export default class AppServer {
  private app: Application = express();
  private port: number = environment.PORT || 3000;

  constructor() {
    this.middlewares();
  }

  public middlewares() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use("/api/v1", new UserRouter().router);
  }

  public run() {
    this.app.listen(this.port, () => {
      console.log(`Application running on port: ${this.port}`);
    });
  }
}
