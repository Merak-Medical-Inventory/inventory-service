import { Request, Response, NextFunction } from "express";

import { handleSuccess } from "@helpers/succesHandler";
import { createOrderSvc, findOrderSvc, findAllOrdersSvc } from '@services/order';
import { ErrorHandler } from '@helpers/ErrorHandler';

export const getOrderByIdCtrl = async (req : Request , res : Response , next: NextFunction) => {
  const {id} = req.params;
  try{
      const data =  await findOrderSvc({id});
      if(!data) throw new ErrorHandler(404,"Pedido no encontrado")
      handleSuccess(201, 'Pedido', res, next,data);
  }catch (e){
      next(e);
  }
}

export const getAllOrdersCtrl = async (req : Request , res : Response , next: NextFunction) => {
  try{
      const data =  await findAllOrdersSvc({});
      handleSuccess(201, 'Pedidos', res, next,data);
  }catch (e){
      next(e);
  }
}

export const createOrderCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
     const { items , user , provider } = req.body
     const data = await createOrderSvc(items,user,provider)
     handleSuccess(200,'Pedido creado',res,next,data);
  } catch (e) {
    next(e);
  }
};
