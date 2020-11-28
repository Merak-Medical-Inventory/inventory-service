import logger from '@shared/Logger';
import OrderDepartment from '@db/entity/OrderDepartment/OrderDepartment';
import {findOrderDepartment, findAllOrderDepartments, updateOrderDepartment } from '@db/entity/OrderDepartment/OrderDepartmentDao';
import Item from '@db/entity/Item/Item';
import { getManager } from 'typeorm';
import OrderDepartmentToItem from '@db/entity/OrderDepartmentToItem/OrderDepartmentToItem';
import User from '@entity/user/User';
import Department from '@db/entity/Department/Department';
import Stock from '@db/entity/Stock/Stock';
import LotToStock from '@db/entity/LotToStock/LotToStock';
import Inventory from '@db/entity/Inventory/Inventory';
import { userInfo } from 'os';

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

export const getActualStockForOrderSvc = async ( id : any) : Promise<Array<any>>=> {
    try {
        const manager = getManager();
        const order = await manager.findOne(OrderDepartment,id,{
            relations : ['OrderDepartmentToItem','OrderDepartmentToItem.item', 'OrderDepartmentToItem.item.generalItem',
                'OrderDepartmentToItem.item.category', 'OrderDepartmentToItem.item.brand',
                'OrderDepartmentToItem.item.presentation']
        })
        const itemList = [];
        for await (const orderDepartmentToItem of order.OrderDepartmentToItem){
            const principalStock = await manager.find(Stock,{
                where : {
                    inventory : 1,
                    item : orderDepartmentToItem.item
                }
            })
            itemList.push({
                item : {
                    ...orderDepartmentToItem.item
                },
                orderAmount : orderDepartmentToItem.amount,
                actualAmount : principalStock.length != 0 ? principalStock[0].amount : 0,
                canSupply : principalStock.length != 0 ? principalStock[0].amount > orderDepartmentToItem.amount ? true : false : false
            })
        }
        return itemList;
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
    items: Array<any>,
    message: string,
    senderId: number
) : Promise<OrderDepartment> => {
    try {
        return await getManager().transaction(async (manager) => {
            const order = await manager.findOne(OrderDepartment,orderId,{
                relations : ["OrderDepartmentToItem","OrderDepartmentToItem.item", "department",
                    "department.inventory"]
            });
            //
            for await (const item of items){
                const primaryStock = await manager.find(Stock,{
                    relations : ["LotToStock", "LotToStock.lot"],
                    where : {
                        inventory : 1,
                        item : item.id
                    }
                });
                if(primaryStock.length === 0) continue;
                const deparmentStockResult = await manager.find(Stock,{
                    relations : ["LotToStock", "LotToStock.lot"],
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
                const newLotToStockList : LotToStock[] = [];
                for await (const primaryLotToStock of lotToStockList){
                    if(amount === 0) break;
                    if(primaryLotToStock.amount === 0) continue;
                    let lotToStock = deparmentStock.LotToStock ? deparmentStock.LotToStock.find(lotToStock => lotToStock.lot.id ===  primaryLotToStock.lot.id) : null;
                    let newlotToStock = newLotToStockList.find(lotToStock => lotToStock.lot.id ===  primaryLotToStock.lot.id);
                    lotToStock = newlotToStock ? lotToStock : lotToStock ? lotToStock : new LotToStock();
                    if(primaryLotToStock.amount >= amount ){
                        primaryLotToStock.amount -= amount;
                        lotToStock.amount = amount;
                        lotToStock.stock = deparmentStock;
                        lotToStock.lot = primaryLotToStock.lot;
                        amount = 0;
                    }else{
                        lotToStock.amount = primaryLotToStock.amount;
                        lotToStock.stock = deparmentStock;
                        lotToStock.lot = primaryLotToStock.lot;
                        amount -=  primaryLotToStock.amount;
                        primaryLotToStock.amount = 0;
                    }
                    await manager.save(primaryLotToStock);
                    if(!lotToStock.amount) continue;
                    newLotToStockList.push(lotToStock);
                }
                const primaryStockToSave = primaryStock[0];
                primaryStockToSave.amount -= item.amount;
                await manager.save(primaryStockToSave);
                deparmentStock.amount += item.amount;
                const deparmentOrderToItem = order.OrderDepartmentToItem.find(orderDepartmentToItem => orderDepartmentToItem.item.id === item.id)
                deparmentOrderToItem.acceptedAmount = item.amount;
                await manager.save(deparmentOrderToItem);
                await manager.save(deparmentStock);
                await manager.save(newLotToStockList);
            }
            order.status = 'aprobado';
            const sender = new User();
            sender.id = senderId;
            order.sender = sender;
            order.response = message;
            order.dateResponse = new Date();
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
