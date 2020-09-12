import logger from "@shared/Logger";
import Order from "@db/entity/Order/Order";
import {findOrder, findAllOrders, updateOrder } from "@db/entity/Order/OrderDao";
import Provider from "@db/entity/Provider/Provider";
import Item from "@db/entity/Item/Item";
import OrderToItem from "@db/entity/OrderToItem/OrderToItem";
import { getManager } from "typeorm";

export const findOrderSvc = async (criteria: any) => {
  try {
    return await findOrder(criteria);
  } catch (e) {
    logger.error("TCL: findItem -> e", e);
    throw e;
  }
};

export const findAllOrdersSvc = async (criteria: any) => {
  try {
    return await findAllOrders(criteria);
  } catch (e) {
    logger.error("TCL: findAllOrdersSvc -> e", e);
    throw e;
  }
};

export const createOrderSvc = async (
  items: Array<any>,
  user: number,
  providerId: number
) => {
  try {
    return await getManager().transaction(async (manager) => {
      const order = new Order();
      const provider = new Provider();
      provider.id = providerId;
      order.provider = provider;
      order.status = "solicitado";
      order.date = new Date();
      await manager.save(order);

      for await (const item of items) {
        const savedItem = await manager.findOne(Item, item.id);
        if (!savedItem) continue;
        let orderToItem = new OrderToItem();
        orderToItem.item = savedItem;
        orderToItem.order = order;
        orderToItem.amount = item.amount;
        await manager.save(orderToItem);
      }
      return await manager.save(order);
    });
  } catch (e) {
    logger.error("TCL: createOrderSvc -> e", e);
    throw e;
  }
};

export const updateOrderSvc = async (id: any, dataToUpdate: any = {}) => {
    try {
      return await updateOrder(id, dataToUpdate);
    } catch (e) {
      logger.error("TCL: updateOrderSvc -> e", e);
      throw e;
    }
  };