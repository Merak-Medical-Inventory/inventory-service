import { getManager } from "typeorm";
import { ErrorHandler } from "@helpers/ErrorHandler";
import OrderDepartment from "./OrderDepartment";

export const findOrderDepartment = async (criteria: any) => {
    try {
        const orderDepartmentRepository = getManager().getRepository(OrderDepartment);
        const orderDepartment = await orderDepartmentRepository.findOne({
            relations: ["transmitter", "sender", "OrderDepartmentToItem", "OrderDepartmentToItem.item",
                "OrderDepartmentToItem.item.generalItem", "OrderDepartmentToItem.item.category", "OrderDepartmentToItem.item.brand",
                "OrderDepartmentToItem.item.presentation"],
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
            relations: ["department","transmitter", "sender", "OrderDepartmentToItem", "OrderDepartmentToItem.item",
                "OrderDepartmentToItem.item.generalItem", "OrderDepartmentToItem.item.category", "OrderDepartmentToItem.item.brand",
                "OrderDepartmentToItem.item.presentation"],
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
        if ((update.affected = 0)) throw new ErrorHandler(404, "orderDepartment not found");
        return await orderDepartmentRepository.findOne({ id });
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};
