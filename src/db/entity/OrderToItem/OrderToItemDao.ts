import { getManager } from 'typeorm';
import { ErrorHandler } from '@helpers/ErrorHandler';
import OrderToItem from './OrderToItem';

export const createorderToItem = async (orderToItem: OrderToItem) => {
    try {
      const orderToItemRepository = getManager().getRepository(OrderToItem);
      await orderToItemRepository.save(orderToItem);
      return orderToItem;
    } catch (error) {
      throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
  };