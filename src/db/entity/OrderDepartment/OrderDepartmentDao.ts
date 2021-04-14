import { getManager } from 'typeorm';
import { ErrorHandler } from '@helpers/ErrorHandler';
import OrderDepartment from './OrderDepartment';
import {findItem} from '@entity/Item/ItemDao';
import Item from "@entity/Item/Item";

export const findOrderDepartment = async (criteria: any) => {
    try {
        const orderDepartmentRepository = getManager().getRepository(OrderDepartment);
        const orderDepartment = await orderDepartmentRepository.findOne({
            relations: ['transmitter', 'sender', 'OrderDepartmentToItem', 'OrderDepartmentToItem.item',
                'OrderDepartmentToItem.item.generalItem', 'OrderDepartmentToItem.item.category', 'OrderDepartmentToItem.item.brand',
                'OrderDepartmentToItem.item.presentation'],
            where: criteria,
        });
        return orderDepartment;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findAllOrderDepartments = async (criteria: any) => {
    try {
        const orderDepartmentRepository = getManager().getRepository(OrderDepartment);
        const orderDepartments = await orderDepartmentRepository.find({
            relations: ['department','transmitter', 'sender', 'OrderDepartmentToItem', 'OrderDepartmentToItem.item',
                'OrderDepartmentToItem.item.generalItem', 'OrderDepartmentToItem.item.category', 'OrderDepartmentToItem.item.brand',
                'OrderDepartmentToItem.item.presentation'],
            where: criteria,
        });
        return orderDepartments;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};
export const createOrderDepartment = async (orderDepartment: OrderDepartment) => {
    try {
        const orderDepartmentRepository = getManager().getRepository(OrderDepartment);
        await orderDepartmentRepository.save(orderDepartment);
        return orderDepartment;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const updateOrderDepartment = async (id: any, dataToUpdate: any) => {
    try {
        const orderDepartmentRepository = getManager().getRepository(OrderDepartment);
        const update = await orderDepartmentRepository.update(id, { ...dataToUpdate });
        if ((update.affected = 0)) throw new ErrorHandler(404, 'orderDepartment not found');
        return await orderDepartmentRepository.findOne({ id });
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findDepartmentsOrder = async (filter: any) => {
    try {
        const orderDepartmentRepository = getManager().getRepository(OrderDepartment);
        let result;
        if (filter.startDate && filter.endDate) {
            console.log(filter.startDate);
            result = await orderDepartmentRepository.query('SELECT count(o.*) as orders, d.* ' +
                'FROM order_department o, department d ' +
                'WHERE "departmentId" = d.id ' +
                'AND o.date >= timestamp \'' + filter.startDate + ' 00:00:00 \'' +
                'AND o.date <= timestamp \'' + filter.endDate + ' 00:00:00 \'' +
                'GROUP BY d.id ' +
                'ORDER BY orders ' + filter.order +';');
        } else {
            result = await orderDepartmentRepository.query('SELECT count(o.*) as orders, d.* ' +
                'FROM order_department o, department d ' +
                'WHERE "departmentId" = d.id ' +
                'GROUP BY d.id ' +
                'ORDER BY orders ' + filter.order +';');
        }
        return result;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findItemsDepartmentOrder = async (filter: any) => {
    try {
        const orderDepartmentRepository = getManager().getRepository(OrderDepartment);
        let result;
        if (filter.startDate && filter.endDate) {
            console.log(filter.startDate);
            if (filter.department) {
                result = await orderDepartmentRepository.query('SELECT count(ot.*) as orders, ' +
                    'sum(ot.amount) as total, i.id as item ' +
                    'FROM order_department od, order_department_to_item ot, item i ' +
                    'WHERE ot."orderDepartmentId" = od.id ' +
                    'AND ot."itemId" = i.id ' +
                    'AND od.id =  ' + filter.department + ' ' +
                    'AND o.date >= timestamp \'' + filter.startDate + ' 00:00:00 \'' +
                    'AND o.date <= timestamp \'' + filter.endDate + ' 00:00:00 \'' +
                    'GROUP BY i.id ' +
                    'ORDER BY orders ' + filter.order +';');
            } else {
                result = await orderDepartmentRepository.query('SELECT count(ot.*) as orders, ' +
                    'sum(ot.amount) as total, i.id as item ' +
                    'FROM order_department od, order_department_to_item ot, item i ' +
                    'WHERE ot."orderDepartmentId" = od.id ' +
                    'AND ot."itemId" = i.id ' +
                    'AND o.date >= timestamp \'' + filter.startDate + ' 00:00:00 \'' +
                    'AND o.date <= timestamp \'' + filter.endDate + ' 00:00:00 \'' +
                    'GROUP BY i.id ' +
                    'ORDER BY orders ' + filter.order +';');
            }
        } else {
            if (filter.department) {
                result = await orderDepartmentRepository.query('SELECT count(ot.*) as orders, ' +
                    'sum(ot.amount) as total, i.id as item ' +
                    'FROM order_department od, order_department_to_item ot, item i ' +
                    'WHERE ot."orderDepartmentId" = od.id ' +
                    'AND ot."itemId" = i.id ' +
                    'AND od.id =  ' + filter.department + ' ' +
                    'GROUP BY i.id ' +
                    'ORDER BY orders ' + filter.order +';');
            } else {
                result = await orderDepartmentRepository.query('SELECT count(ot.*) as orders, ' +
                    'sum(ot.amount) as total, i.id as item ' +
                    'FROM order_department od, order_department_to_item ot, item i ' +
                    'WHERE ot."orderDepartmentId" = od.id ' +
                    'AND ot."itemId" = i.id ' +
                    'GROUP BY i.id ' +
                    'ORDER BY orders ' + filter.order +';');
            }
        }
        console.log(result);
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
