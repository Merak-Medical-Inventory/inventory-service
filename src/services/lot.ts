import logger from "@shared/Logger";
import Item from "@db/entity/Item/Item";
import OrderToItem from "@db/entity/OrderToItem/OrderToItem";
import { getManager, getRepository } from "typeorm";
import { findLot, findAllLots, updateLot } from "@db/entity/Lot/LotDao";
import { findOrderSvc } from "./order";
import { ErrorHandler } from "@helpers/ErrorHandler";
import { Lot } from '@db/entity/Lot/Lot';
import { findInventorySvc } from './inventory';
import { principalInventoryId } from '@shared/consts';
import Stock from '@db/entity/Stock/Stock';
import LotToStock from '@db/entity/LotToStock/LotToStock';

export const findLotSvc = async (criteria: any) => {
  try {
    return await findLot(criteria);
  } catch (e) {
    logger.error("TCL: findLot -> e", e);
    throw e;
  }
};

export const findAllLotsSvc = async (criteria: any) => {
  try {
    return await findAllLots(criteria);
  } catch (e) {
    logger.error("TCL: findAllLotsSvc -> e", e);
    throw e;
  }
};

export const createLotsSvc = async (lots: { orderId: number , items : any }) => {
  try {
    return await getManager().transaction(async (manager) => {
      const order = await findOrderSvc({ id: lots.orderId });
      const entryDate = new Date();
      const inventory = await findInventorySvc({ id : principalInventoryId})
      if(!inventory) throw new ErrorHandler(404, "Principal Iventory not found")
      if (!order) throw new ErrorHandler(404, "Order not found");
      for await (const item of lots.items) {
        const savedItem = await manager.findOne(Item, item.id);
        const orderToItem = order.orderToItem.find( orderToItem => orderToItem.item.id == item.id);
        if (!savedItem || !orderToItem) continue;
        let lot = new Lot();
        lot.item = savedItem;
        lot.order = order;
        lot.dueDate = item.dueDate? item.dueDate : undefined;
        lot.amount = orderToItem.amount;
        lot.entryDate = entryDate;
        await manager.save(lot);
        let stock : Stock = await getRepository(Stock).findOne({
          where: {
            item : item.id,
            inventory : inventory.id
          },
        });
        if(!stock){
          stock = new Stock();
          stock.inventory = inventory;
          stock.amount = lot.amount;
          stock.item = savedItem;
          await manager.save(stock)
        }else{
          stock.amount += lot.amount;
          await manager.save(stock);
        }
        const lotToStock = new LotToStock();
        lotToStock.lot = lot;
        lotToStock.amount = lot.amount;
        lotToStock.stock = stock;
        await manager.save(lotToStock);
      }
      return await findAllLotsSvc({order : order.id});
    });
  } catch (e) {
    logger.error("TCL: createOrderSvc -> e", e);
    throw e;
  }
};

export const updateLotSvc = async (id: any, dataToUpdate: any = {}) => {
  try {
    return await updateLot(id, dataToUpdate);
  } catch (e) {
    logger.error("TCL: updateLotSvc -> e", e);
    throw e;
  }
};
