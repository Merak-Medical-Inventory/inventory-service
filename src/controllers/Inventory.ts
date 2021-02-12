import { Request, Response, NextFunction } from "express";

import { handleSuccess } from "@helpers/succesHandler";
import {findAllInventoriesSvc, findInventorySvc} from '@services/inventory';
import { ErrorHandler } from '@helpers/ErrorHandler';

interface IRequest extends Request {
    [key: string]: any;
}

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

export const findAllInventoriesCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const data = await findAllInventoriesSvc();
        handleSuccess(200, 'Información de los Inventarios', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findAllInventoriesCtrl', e);
        next(e);
    }
};
