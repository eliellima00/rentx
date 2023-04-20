import "reflect-metadata";
import { factoryConfigAWS } from "@utils/factoryConfigAWS";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import upload from "@config/upload";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

import "@shared/container";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

// defino que esses locais serão usados para servir staticamente
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);
createConnection();
// factoryConfigAWS();

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({
          message: err.message,
        })
        .send();
    }
    return response.status(500).json({
      status: "error",
      messsage: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
