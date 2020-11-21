import {NextFunction, Request, Response} from "express";
import {updateStockSvc} from "@services/stock";
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
