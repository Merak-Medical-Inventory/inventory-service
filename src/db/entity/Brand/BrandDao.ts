import { getManager, getConnection } from 'typeorm';
import { Brand} from '@db/entity/Brand/Brand';
import { ErrorHandler } from '@helpers/ErrorHandler';

export const createBrand = async (brand: any) => {
    try {
        const brandRepository = getManager().getRepository(Brand);
        await brandRepository.save(brand);
        return brand;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findBrand = async (criteria: any) => {
    try {
        const brandRepository = getManager().getRepository(Brand);
        return await brandRepository.findOne({
          where: criteria
        });
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findAllBrands = async () => {
    try {
        const brandRepository = getManager().getRepository(Brand);
        const brands = await brandRepository.find();
        return brands;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const updateBrand = async (id: any, dataToUpdate: any) => {
    try {
        const brandRepository = getManager().getRepository(Brand);
        const update = await brandRepository.update(id,{...dataToUpdate });
        if(update.affected === 0) throw new ErrorHandler(404, 'Brand not found');
        return await brandRepository.findOne({id});
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const deleteBrand = async (id: any) => {
    try {
        const brandRepository = getManager().getRepository(Brand);
        const data = await brandRepository.delete({id});
        return {BrandsDeleted : data.affected};
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};
