import {updateStock} from "@entity/Stock/StockDao";
import logger from "@shared/Logger";

export const updateStockSvc = async (id: any, dataToUpdate: any = {}) => {
    try {
        return await updateStock(id, dataToUpdate);
    } catch (e) {
        logger.error("TCL: updateStockSvc -> e", e);
        throw e;
    }
};
