import { findInventory } from '@db/entity/Inventory/InventoryDao';

export const findInventorySvc = async (criteria: any) => {
    try {
        return await findInventory(criteria);
    } catch (e) {
        console.error('TCL: findInventorySvc -> e', e);
        throw e;
    }
};
