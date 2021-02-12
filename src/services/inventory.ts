import {findAllInventories, findInventory} from '@db/entity/Inventory/InventoryDao';

export const findInventorySvc = async (criteria: any) => {
    try {
        return await findInventory(criteria);
    } catch (e) {
        console.error('TCL: findInventorySvc -> e', e);
        throw e;
    }
};

export const findAllInventoriesSvc = async () => {
    try {
        return await findAllInventories();
    } catch (e) {
        console.error('TCL: findAllInventoriesSvc -> e', e);
        throw e;
    }
};
