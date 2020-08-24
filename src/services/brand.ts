import {
    createBrand,
    findBrand,
    findAllBrands,
    updateBrand,
    deleteBrand
} from '@db/entity/Brand/BrandDao';
import logger from "@shared/Logger";

export const createBrandSvc = async (Brand: any) => {
    try {
        return await createBrand(Brand);
    } catch (e) {
        console.error('TCL: createBrandSvc -> e', e);
        throw e;
    }
};

export const findBrandSvc = async (brand: any) => {
    try {
        return await findBrand(brand);
    } catch (e) {
        console.error('TCL: findBrandSvc -> e', e);
        throw e;
    }
};

export const findAllBrandsSvc = async () => {
    try {
        return await findAllBrands();
    } catch (e) {
        console.error('TCL: findAllBrandsSvc -> e', e);
        throw e;
    }
};

export const updateBrandSvc = async (id: any, dataToUpdate: any = {}) => {
    try {
        return await updateBrand(id, dataToUpdate);
    } catch (e) {
        logger.error('TCL: updateBrandSvc -> e', e);
        throw e;
    }
};

export const deleteBrandSvc = async (id: any) => {
    try {
        return await deleteBrand(id);
    } catch (e) {
        logger.error('TCL: deleteBrandSvc -> e', e);
        throw e;
    }
};
