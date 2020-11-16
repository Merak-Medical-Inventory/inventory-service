import { Request, Response, NextFunction } from "express";

import { handleSuccess } from "@helpers/succesHandler";
import { createOrderDepartmentSvc, findOrderDepartmentSvc, findAllOrderDepartmentsSvc, updateOrderDepartmentSvc, findOrderByDeparmentIdSvc, acceptOrdenDeparmentSvc, getActualStockForOrderSvc } from '@services/orderDepartment';
import { ErrorHandler } from '@helpers/ErrorHandler';
import logger from '@shared/Logger';
import Department from '@db/entity/Department/Department';

export const getOrdersByDeparmentIdCtrl = async (req: Request , res : Response , next : NextFunction) => {
    try {
        const {id} = req.params;
        const data : Department = await findOrderByDeparmentIdSvc(id);
        handleSuccess(200,'Pedidos',res,next,data);   
    } catch (e) {
        next(e);
    }
}

export const getActualStockForOrderByCtrl = async (req: Request , res : Response , next : NextFunction) => {
    try {
        const {id} = req.params;
        const data = await getActualStockForOrderSvc(id);
        handleSuccess(200,'Items',res,next,data);   
    } catch (e) {
        next(e);
    }
}

export const getOrderDepartmentByIdCtrl = async (req : Request , res : Response , next: NextFunction) => {
    const {id} = req.params;
    try{
        const data =  await findOrderDepartmentSvc({id});
        if(!data) throw new ErrorHandler(404,"Pedido no encontrado")
        handleSuccess(201, 'Pedido', res, next,data);
    }catch (e){
        next(e);
    }
};

export const getAllOrderDepartmentsCtrl = async (req : Request , res : Response , next: NextFunction) => {
    try{
        const data =  await findAllOrderDepartmentsSvc({});
        handleSuccess(201, 'Pedidos', res, next,data);
    }catch (e){
        next(e);
    }
};

export const createOrderDepartmentCtrl = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { items , transmitter } = req.body
        const data = await createOrderDepartmentSvc(items,transmitter);
        handleSuccess(200,'Pedido creado',res,next,data);
    } catch (e) {
        next(e);
    }
};

export const acceptOrdenDeparmentCtrl = async (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    try {
        const orderId = parseInt(req.params.id)
        const items = req.body.items;
        const message = req.body.message;
        const sender = req.body.sender;
        const data = await acceptOrdenDeparmentSvc(orderId,items,message,sender);
        handleSuccess(200,'Pedido aceptado',res,next,data);
    } catch (e) {
        next(e)
    }
}

export const updateOrderDepartmentCtrl = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const update = req.body;
    const { id } = req.params;
    try {
        const data = await updateOrderDepartmentSvc(id, update);
        handleSuccess(
            201,
            "Pedido actualizado satisfactoriamente",
            res,
            next,
            data
        );
    } catch (e) {
        logger.error("ERROR: controller -> updateUserCtrl", e);
        next(e);
    }
};

