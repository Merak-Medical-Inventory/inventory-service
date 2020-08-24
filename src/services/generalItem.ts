import {
    createGeneralItem,
    findGeneralItem,
    findAllGeneralItems,
    updateGeneralItem,
    deleteGeneralItem
} from '@db/entity/GeneralItem/GeneralItemDao';
import logger from '@shared/Logger';

export const createGeneralItemSvc = async (generalItem: any) => {
    try {
        return await createGeneralItem(generalItem);
    } catch (e) {
        console.error('TCL: createGeneralItemSvc -> e', e);
        throw e;
    }
};

export const findGeneralItemSvc = async (generalItem: any) => {
    try {
        return await findGeneralItem(generalItem);
    } catch (e) {
        console.error('TCL: findGeneralItemSvc -> e', e);
        throw e;
    }
};

export const findAllGeneralItemsSvc = async () => {
    try {
        return await findAllGeneralItems();
    } catch (e) {
        console.error('TCL: findAllGeneralItemsSvc -> e', e);
        throw e;
    }
};

export const updateGeneralItemSvc = async (id: any, dataToUpdate: any = {}) => {
    try {
        return await updateGeneralItem(id, dataToUpdate);
    } catch (e) {
        logger.error('TCL: updateGeneralItemSvc -> e', e);
        throw e;
    }
};

export const deleteGeneralItemSvc = async (id: any) => {
    try {
        return await deleteGeneralItem(id);
    } catch (e) {
        logger.error('TCL: deleteGeneralItemSvc -> e', e);
        throw e;
    }
};
