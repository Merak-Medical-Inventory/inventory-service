import { Request, Response , NextFunction } from 'express';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler/';
import logger from '@shared/Logger';
import { createLotsSvc, findLotSvc } from '@services/lot';


export const getLotByIdCtrl = async (req : Request , res : Response , next : NextFunction) => {
    try {
        const { id } = req.params
        const data = await findLotSvc({id})
        if(!data) throw new ErrorHandler(404,"Lote no encontrado")
        handleSuccess(200,"lote" , res,next,data);
    } catch (e) {
        logger.error("TCL: findLotByIdCtrl -> e", e)
        next(e)
    }
}

export const getAllLotsCtrl = async (req : Request , res : Response , next : NextFunction) => {
    try {
        const criteria = req.body
        const data = await findLotSvc(criteria)
        handleSuccess(200,"lotes" , res,next,data);
    } catch (e) {
        logger.error("TCL: findAllLotsCtrl -> e", e)
        next(e)
    }
}


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