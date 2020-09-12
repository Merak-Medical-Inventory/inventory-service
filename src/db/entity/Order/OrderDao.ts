import { getManager } from 'typeorm';
import Order from './Order';
import { ErrorHandler } from '@helpers/ErrorHandler';

export const findOrder = async (criteria: any) => {
  try {
    const orderRepository = getManager().getRepository(Order);
    const order = await orderRepository.findOne({
      relations: ["provider","orderToItem"],
      where: criteria
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
      relations: ["provider","orderToItem"],
      where: criteria
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