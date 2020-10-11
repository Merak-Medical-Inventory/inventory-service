import { findInventory } from '@db/entity/Inventory/InventoryDao';

export const findInventorySvc = async (category: any) => {
    try {
        return await findInventory(category);
    } catch (e) {
        console.error('TCL: findInventorySvc -> e', e);
        throw e;
    }
};