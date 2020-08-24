import { getManager, getConnection } from "typeorm";
import { GeneralItem } from "@db/entity/GeneralItem/GeneralItem";
import { ErrorHandler } from "@helpers/ErrorHandler";

export const createGeneralItem = async (generalItem: any) => {
    try {
        const generalItemRepository = getManager().getRepository(GeneralItem);
        await generalItemRepository.save(generalItem);
        return GeneralItem;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findGeneralItem = async (criteria: any) => {
    try {
        const generalItemRepository = getManager().getRepository(GeneralItem);
        return await generalItemRepository.findOne({
            where: criteria
        });
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findAllGeneralItems = async () => {
    try {
        const generalItemRepository = getManager().getRepository(GeneralItem);
        const genItems = await generalItemRepository.find();
        return genItems;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const updateGeneralItem = async (id: any, dataToUpdate: any) => {
    try {
        const generalItemRepository = getManager().getRepository(GeneralItem);
        const update = await generalItemRepository.update(id, { ...dataToUpdate });
        if (update.affected === 0)
            throw new ErrorHandler(404, "GeneralItem not found");
        return await generalItemRepository.findOne({ id });
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const deleteGeneralItem = async (id: any) => {
    try {
        const generalItemRepository = getManager().getRepository(GeneralItem);
        const data = await generalItemRepository.delete({ id });
        return { CategoriesDeleted: data.affected };
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};
