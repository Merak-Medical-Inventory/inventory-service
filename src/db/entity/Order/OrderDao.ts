import { getManager } from "typeorm";
import Order from "./Order";
import { ErrorHandler } from "@helpers/ErrorHandler";
import {findItem} from "@entity/Item/ItemDao";

export const findOrder = async (criteria: any) => {
  try {
    const orderRepository = getManager().getRepository(Order);
    const order = await orderRepository.findOne({
      relations: ["provider", "orderToItem" , "orderToItem.item"],
      where: criteria,
    });
    return order;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findAllOrders = async (criteria: any) => {
  try {
    const orderRepository = getManager().getRepository(Order);
    const orders = await orderRepository.find({
      relations: ["provider", "orderToItem", "orderToItem.item", 
      "orderToItem.item.generalItem", "orderToItem.item.category", "orderToItem.item.brand",
      "orderToItem.item.presentation"],
      where: criteria,
    });
    return orders;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};
export const createOrder = async (order: Order) => {
  try {
    const orderRepository = getManager().getRepository(Order);
    await orderRepository.save(order);
    return order;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const updateOrder = async (id: any, dataToUpdate: any) => {
  try {
    const orderRepository = getManager().getRepository(Order);
    const update = await orderRepository.update(id, { ...dataToUpdate });
    if ((update.affected = 0)) throw new ErrorHandler(404, "Order not found");
    return await orderRepository.findOne({ id });
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findItemsOrderStats = async (filter: any) => {
  try {
    const orderRepository = getManager().getRepository(Order);
    let result;
    if (filter.startDate && filter.endDate) {
      if (filter.category) {
        result = await orderRepository.query('SELECT count(ot.*) as orders, ' +
            'sum(ot.amount) as total, i.id as item ' +
            'FROM public.order od, order_to_item ot, item i ' +
            'WHERE ot."orderId" = od.id ' +
            'AND ot."itemId" = i.id ' +
            'AND i."categoryId" = ' + filter.category + ' ' +
            'AND o.date >= timestamp \'' + filter.startDate + ' 00:00:00 \'' +
            'AND o.date <= timestamp \'' + filter.endDate + ' 00:00:00 \'' +
            'GROUP BY i.id ' +
            'ORDER BY orders ' + filter.order + ';');
      } else {
        result = await orderRepository.query('SELECT count(ot.*) as orders, ' +
            'sum(ot.amount) as total, i.id as item ' +
            'FROM public.order od, order_to_item ot, item i ' +
            'WHERE ot."orderId" = od.id ' +
            'AND ot."itemId" = i.id ' +
            'AND o.date >= timestamp \'' + filter.startDate + ' 00:00:00 \'' +
            'AND o.date <= timestamp \'' + filter.endDate + ' 00:00:00 \'' +
            'GROUP BY i.id ' +
            'ORDER BY orders ' + filter.order + ';');
      }
    } else {
      if (filter.category) {
          result = await orderRepository.query('SELECT count(ot.*) as orders, ' +
              'sum(ot.amount) as total, i.id as item ' +
              'FROM public.order od, order_to_item ot, item i ' +
              'WHERE ot."orderId" = od.id ' +
              'AND ot."itemId" = i.id ' +
              'AND i."categoryId" = ' + filter.category + ' ' +
              'GROUP BY i.id ' +
              'ORDER BY orders ' + filter.order +';');
      } else {
        result = await orderRepository.query('SELECT count(ot.*) as orders, ' +
            'sum(ot.amount) as total, i.id as item ' +
            'FROM public.order od, order_to_item ot, item i ' +
            'WHERE ot."orderId" = od.id ' +
            'AND ot."itemId" = i.id ' +
            'GROUP BY i.id ' +
            'ORDER BY orders ' + filter.order +';');
      }
    }
    result = await Promise.all(await result.map((async (x: any) => {
      const element: any = {
        orders: x.orders,
        total: x.total,
        item: await findItem({id:x.item})
      };
      return element;
    })));
    return result;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};
