import { Request, Response , NextFunction } from 'express';
import {
    createGeneralItemSvc,
    findGeneralItemSvc,
    findAllGeneralItemsSvc,
    updateGeneralItemSvc,
    deleteGeneralItemSvc
} from '@services/GeneralItem';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler/';
import logger from '@shared/Logger';

interface IRequest extends Request {
    [key: string]: any;
}

export const createGeneralItemCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const generalItem = req.body;
    try{
        const data =  await createGeneralItemSvc(generalItem);
        handleSuccess(201, 'Insumo General Creado', res, next,data);
    }catch (e){
        next(new ErrorHandler(500, e.message));
    }
};

export const findGeneralItemCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const data = await findGeneralItemSvc({id});
        handleSuccess(200, 'Información de el Insumo General', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findGeneralItemCtrl', e);
        next(e);
    }
};

export const findAllGeneralItemsCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const data = await findAllGeneralItemsSvc();
        handleSuccess(200, 'Información de los Insumos Generales', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findAllGeneralItemsCtrl', e);
        next(e);
    }
};

export const updateGeneralItemCtrl = async ( req: IRequest, res: Response, next: NextFunction) => {
    const update = req.body;
    const { id } = req.params;
    try {
        const data = await updateGeneralItemSvc(id, update);
        handleSuccess(
            201,
            'Insumo General actualizado satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> updateGeneralItemCtrl', e);
        next(e);
    }
};

export const deleteGeneralItemCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const data = await deleteGeneralItemSvc(id);
        handleSuccess(
            201,
            'Insumo General eliminado satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> deleteGeneralItemCtrl', e);
        next(e);
    }
};
