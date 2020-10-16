import { getManager } from 'typeorm';
import Inventory from './Inventory';
import { ErrorHandler } from '@helpers/ErrorHandler';

export const findInventory = async (criteria: any) => {
  try {
    const inventoryRepository = getManager().getRepository(Inventory);
    return await inventoryRepository.findOne({
      relations: ["stock", "stock.item",
        "stock.item.generalItem", "stock.item.category", "stock.item.brand",
        "stock.item.presentation", "stock.LotToStock", "stock.LotToStock.lot"],
      where: criteria,
    });
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};
