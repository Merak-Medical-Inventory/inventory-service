import { Request, Response , NextFunction } from 'express';
import {
    createPresentationSvc,
    findPresentationSvc,
    findAllPresentationsSvc,
    updatePresentationSvc,
    deletePresentationSvc
} from '@services/Presentation';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler/';
import logger from '@shared/Logger';

interface IRequest extends Request {
    [key: string]: any;
}

export const createPresentationCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const Presentation = req.body;
    try{
        const data =  await createPresentationSvc(Presentation);
        handleSuccess(201, 'Presentación Creada', res, next,data);
    }catch (e){
        next(new ErrorHandler(500, e.message));
    }
};

export const findPresentationCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const data = await findPresentationSvc(id);
        handleSuccess(200, 'Información de la Presentación', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findPresentationCtrl', e);
        next(e);
    }
};

export const findAllPresentationsCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const data = await findAllPresentationsSvc();
        handleSuccess(200, 'Información de las Presentaciones', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findAllPresentationsCtrl', e);
        next(e);
    }
};

export const updatePresentationCtrl = async ( req: IRequest, res: Response, next: NextFunction) => {
    const update = req.body;
    const { id } = req.params;
    try {
        const data = await updatePresentationSvc(id, update);
        handleSuccess(
            201,
            'Presentación actualizada satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> updatePresentationCtrl', e);
        next(e);
    }
};

export const deletePresentationCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const data = await deletePresentationSvc(id);
        handleSuccess(
            201,
            'Presentación eliminada satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> deletePresentationCtrl', e);
        next(e);
    }
};
