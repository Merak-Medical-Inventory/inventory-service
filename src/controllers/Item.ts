import { Request, Response, NextFunction } from "express";

import { handleSuccess } from "@helpers/succesHandler";
import { ErrorHandler } from "@helpers/ErrorHandler/";
import logger from '@shared/Logger';
import { findAllItemsSvc, findItemSvc, createItemSvc, updateItemSvc, deleteItemSvc } from '@services/item';

interface IRequest extends Request {
  [key: string]: any;
}

export const getAllItemsCtrl = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await findAllItemsSvc({});
    handleSuccess(200, "Items", res, next, data);
  } catch (e) {
    logger.error("ERROR: controller -> getAllItemsCtrl", e);
    next(e);
  }
};

export const getItemCtrl = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.params
  try {
    const data = await findItemSvc({id});
    if(!data) throw new ErrorHandler(404, "Item no encontrado");
    handleSuccess(200, "Item information", res, next, data);
  } catch (e) {
    logger.error("ERROR: controller -> getItemCtrl", e);
    next(e);
  }
};

export const createItemCtrl = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const item = req.body;
  try {
    const data = await createItemSvc(item);
    handleSuccess(201, "Item creado", res, next, data);
  } catch (e) {
    next(e);
  }
};

export const updateItemCtrl = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const update = req.body;
  const { id } = req.params;
  try {
    const data = await updateItemSvc(id, update);
    handleSuccess(
      201,
      "Item actualizado satisfactoriamente",
      res,
      next,
      data
    );
  } catch (e) {
    logger.error("ERROR: controller -> updateItemCtrl", e);
    next(e);
  }
};

export const deleteItemCtrl = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const data = await deleteItemSvc(id);
    handleSuccess(
      201,
      "Item eliminado satisfactoriamente",
      res,
      next,
      data
    );
  } catch (e) {
    logger.error("ERROR: controller -> deleteItemCtrl", e);
    next(e);
  }
};
