import { Request, Response , NextFunction } from 'express';
import {
    createBrandSvc,
    findBrandSvc,
    findAllBrandsSvc,
    updateBrandSvc,
    deleteBrandSvc
} from '@services/brand';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler/';
import logger from '@shared/Logger';

interface IRequest extends Request {
    [key: string]: any;
}

export const createBrandCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const brand = req.body;
    try{
        const data =  await createBrandSvc(brand);
        handleSuccess(201, 'Marca Creada', res, next,data);
    }catch (e){
        next(new ErrorHandler(500, e.message));
    }
};

export const findBrandCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const data = await findBrandSvc({id});
        handleSuccess(200, 'Información de la Marca', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findBrandCtrl', e);
        next(e);
    }
};

export const findAllBrandsCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const data = await findAllBrandsSvc();
        handleSuccess(200, 'Información de las Marcas', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findAllBrandsCtrl', e);
        next(e);
    }
};

export const updateBrandCtrl = async ( req: IRequest, res: Response, next: NextFunction) => {
    const update = req.body;
    const { id } = req.params;
    try {
        const data = await updateBrandSvc(id, update);
        handleSuccess(
            201,
            'Marca actualizada satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> updateBrandCtrl', e);
        next(e);
    }
};

export const deleteBrandCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const data = await deleteBrandSvc(id);
        handleSuccess(
            201,
            'Marca eliminada satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> deleteBrandCtrl', e);
        next(e);
    }
};
