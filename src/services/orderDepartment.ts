import logger from '@shared/Logger';
import OrderDepartment from '@db/entity/OrderDepartment/OrderDepartment';
import {findOrderDepartment, findAllOrderDepartments, updateOrderDepartment } from '@db/entity/OrderDepartment/OrderDepartmentDao';
import Item from '@db/entity/Item/Item';
import { getManager } from 'typeorm';
import OrderDepartmentToItem from '@db/entity/OrderDepartmentToItem/OrderDepartmentToItem';
import User from '@entity/user/User';
import Department from '@db/entity/Department/Department';
import Stock from '@db/entity/Stock/Stock';
import LotToStock from '@db/entity/LotToStock.ts/LotToStock';

export const findOrderByDeparmentIdSvc = async ( id : any) : Promise<Department> => {
    try {
        return await getManager().findOne(Department,id,{
            relations : ['orderDepartment','orderDepartment.transmitter', 'orderDepartment.sender', 'orderDepartment.OrderDepartmentToItem',
                'orderDepartment.OrderDepartmentToItem.item', 'orderDepartment.OrderDepartmentToItem.item.generalItem',
                'orderDepartment.OrderDepartmentToItem.item.category', 'orderDepartment.OrderDepartmentToItem.item.brand',
                'orderDepartment.OrderDepartmentToItem.item.presentation']
        })
    } catch (e) {
        logger.error('TCL: findOrderByDeparmentIdSvc -> e', e);
        throw e;
    }
}

export const findOrderDepartmentSvc = async (criteria: any) => {
    try {
        return await findOrderDepartment(criteria);
    } catch (e) {
        logger.error('TCL: findItem -> e', e);
        throw e;
    }
};

export const findAllOrderDepartmentsSvc = async (criteria: any) => {
    try {
        return await findAllOrderDepartments(criteria);
    } catch (e) {
        logger.error('TCL: findAllOrderDepartmentsSvc -> e', e);
        throw e;
    }
};

export const createOrderDepartmentSvc = async (
    items: any[],
    transmitterId: number
) : Promise<OrderDepartment> => {
    try {
        return await getManager().transaction(async (manager) => {
            const orderDepartment = new OrderDepartment();
            const transmitter = await manager.findOne(User, transmitterId,{
                relations: ['department']
            });
            transmitter.id = transmitterId;
            orderDepartment.department = transmitter.department;
            orderDepartment.transmitter = transmitter;
            orderDepartment.status = 'solicitado';
            orderDepartment.date = new Date();
            await manager.save(orderDepartment);
            for await (const item of items) {
                const savedItem = await manager.findOne(Item, item.id);
                if (!savedItem) continue;
                const orderDepartmentToItem = new OrderDepartmentToItem();
                orderDepartmentToItem.item = savedItem;
                orderDepartmentToItem.orderDepartment = orderDepartment;
                orderDepartmentToItem.amount = item.amount;
                await manager.save(orderDepartmentToItem);
            }
            return await manager.save(orderDepartment);
        });
    } catch (e) {
        logger.error('TCL: createOrderDepartmentSvc -> e', e);
        throw e;
    }
};

export const acceptOrdenDeparmentSvc = async (
    orderId : number,
    items: Array<any>
) : Promise<OrderDepartment> => {
    try {
        return await getManager().transaction(async (manager) => {
            const order = await manager.findOne(OrderDepartment,orderId,{
                relations : ["OrderDepartmentToItem","OrderDepartmentToItem.item", "deparment" , "deparment.inventory"]
            });
            //
            const deparmentStockList : Array<Stock>= [] 
            for await (const item of items){
                const primaryStock = await manager.find(Stock,{
                    relations : ["LotToStock", "LotToStock.lot"],
                    where : {
                        item : item.id
                    }
                });
                if(primaryStock.length === 0) continue;
                const deparmentStockResult = await manager.find(Stock,{
                    where : {
                        inventory : order.department.inventory[0].id,
                        item : item.id
                    }
                });
                let deparmentStock : Stock;
                if(deparmentStockResult.length === 0){
                    deparmentStock = new Stock();
                    deparmentStock.amount = 0;
                    deparmentStock.inventory = order.department.inventory[0]
                    const itemInstance = new Item();
                    itemInstance.id = item.id;
                    deparmentStock.item = itemInstance;
                }else{
                    deparmentStock = deparmentStockResult[0]
                }
                const lotToStockList = primaryStock[0].LotToStock.sort((a , b)=> a.lot.entryDate.valueOf() - b.lot.entryDate.valueOf());
                let amount = item.amount;
                for await (const primaryLotToStock of lotToStockList){
                    if(amount === 0) break;
                    const lotToStock = new LotToStock();
                    if(primaryLotToStock.amount >= amount ){
                        lotToStock.amount = amount;
                        lotToStock.stock = deparmentStock;
                        lotToStock.lot = primaryLotToStock.lot;
                        amount = 0;
                        primaryLotToStock.amount -= amount;
                    }else{
                        lotToStock.amount = primaryLotToStock.amount;
                        lotToStock.stock = deparmentStock;
                        lotToStock.lot = primaryLotToStock.lot;
                        amount -=  primaryLotToStock.amount;
                        primaryLotToStock.amount = 0;
                    }
                    await manager.save(primaryLotToStock);
                    if(!lotToStock.amount) continue;
                    deparmentStock.LotToStock.push(lotToStock);
                }
                deparmentStock.amount = item.amount;
                const deparmentOrderToItem = new OrderDepartmentToItem();
                deparmentOrderToItem.amount = item.amount;
                deparmentOrderToItem.item = deparmentStock.item;
                deparmentOrderToItem.orderDepartment = order;
                deparmentOrderToItem.type = true;
                await manager.save(deparmentOrderToItem);
                deparmentStockList.push(deparmentStock);
            }
            await manager.save(deparmentStockList)
            order.status = 'accepted';
            return await manager.save(order);
        });
    } catch (e) {
        logger.error("TCL: createOrderDepartmentSvc -> e", e);
        throw e;
    }
};

export const updateOrderDepartmentSvc = async (id: any, dataToUpdate: any = {}) => {
    try {
        return await updateOrderDepartment(id, dataToUpdate);
    } catch (e) {
        logger.error('TCL: updateOrderDepartmentSvc -> e', e);
        throw e;
    }
};
