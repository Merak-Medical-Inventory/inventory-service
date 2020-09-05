import { Request, Response, NextFunction } from "express";

import { handleSuccess } from "@helpers/succesHandler";
import { ErrorHandler } from "@helpers/ErrorHandler/";
import logger from '@shared/Logger';
import { findAllProvidersSvc, findProviderSvc, createProviderSvc, updateProviderSvc, deleteProviderSvc } from '@services/provider';

interface IRequest extends Request {
    [key: string]: any;
}

export const getAllProvidersCtrl = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await findAllProvidersSvc({});
        handleSuccess(200, "Proveedores", res, next, data);
    } catch (e) {
        logger.error("ERROR: controller -> getAllProvidersCtrl", e);
        next(e);
    }
};

export const getProviderCtrl = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    const {id} = req.params
    try {
        const data = await findProviderSvc({id});
        if(!data) throw new ErrorHandler(404, "Proveedor no encontrado");
        handleSuccess(200, "Información del Proveedor", res, next, data);
    } catch (e) {
        logger.error("ERROR: controller -> getProviderCtrl", e);
        next(e);
    }
};

export const createProviderCtrl = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    const Provider = req.body;
    try {
        const data = await createProviderSvc(Provider);
        handleSuccess(201, "Proveedor Creado", res, next, data);
    } catch (e) {
        next(e);
    }
};

export const updateProviderCtrl = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    const update = req.body;
    const { id } = req.params;
    try {
        const data = await updateProviderSvc(id, update);
        handleSuccess(
            201,
            "Proveedor actualizado satisfactoriamente",
            res,
            next,
            data
        );
    } catch (e) {
        logger.error("ERROR: controller -> updateProviderCtrl", e);
        next(e);
    }
};

export const deleteProviderCtrl = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        const data = await deleteProviderSvc(id);
        handleSuccess(
            201,
            "Proveedor eliminado satisfactoriamente",
            res,
            next,
            data
        );
    } catch (e) {
        logger.error("ERROR: controller -> deleteProviderCtrl", e);
        next(e);
    }
};
