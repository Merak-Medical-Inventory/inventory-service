import logger from "@shared/Logger";
import OrderDepartment from "@db/entity/OrderDepartment/OrderDepartment";
import {findOrderDepartment, findAllOrderDepartments, updateOrderDepartment } from "@db/entity/OrderDepartment/OrderDepartmentDao";
import Item from "@db/entity/Item/Item";
import { getManager } from "typeorm";
import OrderDepartmentToItem from "@db/entity/OrderDepartmentToItem/OrderDepartmentToItem";
import User from "@entity/user/User";

export const findOrderDepartmentSvc = async (criteria: any) => {
    try {
        return await findOrderDepartment(criteria);
    } catch (e) {
        logger.error("TCL: findItem -> e", e);
        throw e;
    }
};

export const findAllOrderDepartmentsSvc = async (criteria: any) => {
    try {
        return await findAllOrderDepartments(criteria);
    } catch (e) {
        logger.error("TCL: findAllOrderDepartmentsSvc -> e", e);
        throw e;
    }
};

export const createOrderDepartmentSvc = async (
    items: Array<any>,
    transmitterId: number
) => {
    try {
        return await getManager().transaction(async (manager) => {
            const orderDepartment = new OrderDepartment();
            const transmitter = new User();
            transmitter.id = transmitterId;
            orderDepartment.transmitter = transmitter;
            orderDepartment.status = "solicitado";
            orderDepartment.date = new Date();
            await manager.save(orderDepartment);
            for await (const item of items) {
                const savedItem = await manager.findOne(Item, item.id);
                if (!savedItem) continue;
                let orderDepartmentToItem = new OrderDepartmentToItem();
                orderDepartmentToItem.item = savedItem;
                orderDepartmentToItem.orderDepartment = orderDepartment;
                orderDepartmentToItem.amount = item.amount;
                await manager.save(orderDepartmentToItem);
            }
            return await manager.save(orderDepartment);
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
        logger.error("TCL: updateOrderDepartmentSvc -> e", e);
        throw e;
    }
};
