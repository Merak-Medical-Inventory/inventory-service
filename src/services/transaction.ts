import { findAllTransactions } from '@db/entity/transaction/transactionDao';
import logger from "@shared/Logger";

export const findAllTransactionsSvc = async () => {
    try {
        return await findAllTransactions();
    } catch (e) {
        logger.error('TCL: findAllCategoriesSvc -> e', e);
        throw e;
    }
};