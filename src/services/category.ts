import {
    createCategory,
    findCategory,
    findAllCategories,
    updateCategory,
    deleteCategory
} from '@db/entity/Category/CategoryDao';
import logger from "@shared/Logger";

export const createCategorySvc = async (category: any) => {
    try {
        return await createCategory(category);
    } catch (e) {
        console.error('TCL: createCategorySvc -> e', e);
        throw e;
    }
};

export const findCategorySvc = async (category: any) => {
    try {
        return await findCategory(category);
    } catch (e) {
        console.error('TCL: findCategorySvc -> e', e);
        throw e;
    }
};

export const findAllCategoriesSvc = async () => {
    try {
        return await findAllCategories();
    } catch (e) {
        console.error('TCL: findAllCategoriesSvc -> e', e);
        throw e;
    }
};

export const updateCategorySvc = async (id: any, dataToUpdate: any = {}) => {
    try {
        return await updateCategory(id, dataToUpdate);
    } catch (e) {
        logger.error('TCL: updateCategorySvc -> e', e);
        throw e;
    }
};

export const deleteCategorySvc = async (id: any) => {
    try {
        return await deleteCategory(id);
    } catch (e) {
        logger.error('TCL: deleteCategorySvc -> e', e);
        throw e;
    }
};
