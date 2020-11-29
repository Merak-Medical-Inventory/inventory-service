import {NextFunction, Request, Response} from "express";
import {updateStockSvc, outputItemStockSvc} from "@services/stock";
import {handleSuccess} from "@helpers/succesHandler";
import logger from "@shared/Logger";

interface IRequest extends Request {
    [key: string]: any;
}

export const updateStockCtrl = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    const update = req.body;
    const { id } = req.params;
    try {
        const data = await updateStockSvc(id, update);
        handleSuccess(
            201,
            "Stock actualizado satisfactoriamente",
            res,
            next,
            data
        );
    } catch (e) {
        logger.error("ERROR: controller -> updateStockCtrl", e);
        next(e);
    }
};

export const outputItemStockCtrl = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const amountOutput = req.body.amountOutput;
        const id = parseInt(req.params.id);
        const data = await outputItemStockSvc(id, amountOutput);
        handleSuccess(
            201,
            "Salida Registrada en Stock",
            res,
            next,
            data
        );
    } catch (e) {
        logger.error("ERROR: controller -> outputItemStockCtrl", e);
        next(e);
    }
};
