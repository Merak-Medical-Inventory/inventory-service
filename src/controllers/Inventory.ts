import { Request, Response, NextFunction } from "express";

import { handleSuccess } from "@helpers/succesHandler";
import { findInventorySvc } from '@services/Inventory';
import { ErrorHandler } from '@helpers/ErrorHandler';
import logger from '@shared/Logger';

export const getInventoryByIdCtrl = async (req : Request , res : Response , next: NextFunction) => {
    const {id} = req.params;
    try{
        const data =  await findInventorySvc({id});
        if(!data) throw new ErrorHandler(404,"Inventario no encontrado")
        handleSuccess(201, 'Inventario', res, next,data);
    }catch (e){
        next(e);
    }
};
