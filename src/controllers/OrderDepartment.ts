import { Request, Response, NextFunction } from "express";

import { handleSuccess } from "@helpers/succesHandler";
import { createOrderDepartmentSvc, findOrderDepartmentSvc, findAllOrderDepartmentsSvc, updateOrderDepartmentSvc } from '@services/OrderDepartment';
import { ErrorHandler } from '@helpers/ErrorHandler';
import logger from '@shared/Logger';

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

