import { Request, Response , NextFunction } from 'express';
import { handleSuccess } from '@helpers/succesHandler';
import {findAllTransactionsSvc, findInventoryTransactionsSvc} from '@services/transaction';
import logger from '@shared/Logger';
import { getBcTransactionSvc } from '@helpers/transaction';

interface IRequest extends Request {
    [key: string]: any;
}

export const findAllTransactionCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const data = await findAllTransactionsSvc();
        handleSuccess(200, 'Información de las transacciones', res, next, data);
    } catch (e) {
        logger.error('ERROR: controller -> findAllTransactionCtrl', e);
        next(e);
    }
};

export const findInventoryTransactionsCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        console.log(id);
        const data = await findInventoryTransactionsSvc(Number(id));
        handleSuccess(200, 'Información de las transacciones', res, next, data);
    } catch (e) {
        logger.error('ERROR: controller -> findAllTransactionCtrl', e);
        next(e);
    }
};

export const findBcTransactionCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const data = await getBcTransactionSvc(id);
        handleSuccess(200, 'Información de las transacciones', res, next, data.data);
    } catch (e) {
        logger.error('ERROR: controller -> findAllTransactionCtrl', e);
        next(e);
    }
};
