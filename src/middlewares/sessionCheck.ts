import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@helpers/ErrorHandler";
import { jwtVerify } from "@helpers/jwt";
import { has, get } from "lodash";
import moment from "moment";

export const sessionCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new ErrorHandler(401, "UNAUTHORIZED");
    const token: string = authorization.split(" ")[1];
    const tokenPayload: any = await jwtVerify(token);
    if (
      !has(tokenPayload, "exp") ||
      moment().unix() >= get(tokenPayload, "exp")
    )
      throw new ErrorHandler(401, "UNAUTHORIZED");
    // guarda los datos del usuario que esta haciendo la llamada como variables de entorno
    process.env.USER_ID = tokenPayload.id;
    process.env.USER_USERNAME = tokenPayload.username;
    process.env.USER_EMAIL = tokenPayload.email;
    console.log(tokenPayload);
    next();
  } catch (e) {
    next(e);
  }
};
