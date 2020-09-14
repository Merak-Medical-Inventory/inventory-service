import { Request, Response , NextFunction } from 'express';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler/';
import logger from '@shared/Logger';
import { createLotsSvc } from '@services/lot';

export const createLotsCtrl = async (req : Request , res : Response , next : NextFunction) => {
    try {
        const { order : orderId , items} = req.body;
        const data = await createLotsSvc({orderId,items})
        handleSuccess(200,"lotes creados exitosamente" , res,next,data);
    } catch (e) {
        logger.error("TCL: createLotsCtrl -> e", e)
        next(e)
    }
}