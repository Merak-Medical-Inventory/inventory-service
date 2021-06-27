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
import app from './server';

createConnection(typeOrmConfig).then(async connection => {
  const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
      logger.info("Express server started on port: " + port);
    });
}).catch((error) => console.log(error));

export default app;

