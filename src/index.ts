import './LoadEnv'; // Must be the first import
import "reflect-metadata";
import {createConnection} from "typeorm";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import express, { Request, Response, NextFunction } from "express";
import { BAD_REQUEST } from "http-status-codes";
import "express-async-errors";
import mongoose from "mongoose";

import BaseRouter from "./routes";
import logger from "@shared/Logger";
import { handleError, ErrorHandler } from '@helpers/ErrorHandler'
import { typeOrmConfig } from './config';

// Init express
const app = express();
// Db URL
const dbUrl: any = process.env.DB;
const cors = require('cors');

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

// Add APIs
app.use("/api", BaseRouter);

app.use('/' , (req,res)=>{
    res.json('hello world')
})

// Print API errors
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  handleError(err, res);
});

createConnection(typeOrmConfig).then(async connection => {
  const port = Number(process.env.PORT || 3002);
    app.listen(port, () => {
      logger.info("Express server started on port: " + port);
    });
}).catch((error) => console.log("database connection failed error : " + error));

export default app;

