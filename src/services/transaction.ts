import {findAllTransactions, findInventoryTransactions} from '@db/entity/transaction/transactionDao';
import logger from "@shared/Logger";

export const findAllTransactionsSvc = async () => {
    try {
        return await findAllTransactions();
    } catch (e) {
        logger.error('TCL: findAllCategoriesSvc -> e', e);
        throw e;
    }
};

export const findInventoryTransactionsSvc = async (inventoryId: number) => {
    try {
        return await findInventoryTransactions(inventoryId);
    } catch (e) {
        logger.error('TCL: findAllCategoriesSvc -> e', e);
        throw e;
    }
};
