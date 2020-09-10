import { getManager } from "typeorm";
import Provider from "@db/entity/Provider/Provider";
import { ErrorHandler } from "@helpers/ErrorHandler";

export const findAllProviders = async (criteria: any) => {
    try {
        const providerRepository = getManager().getRepository(Provider);
        return await providerRepository.find({
            relations: ["items"],
            where: criteria
        })
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findProvider = async (criteria: any) => {
    try {
        const providerRepository = getManager().getRepository(Provider);
        return await providerRepository.findOne({
            relations: ["items"],
            where: criteria
        })
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const createProvider = async (provider: any) => {
    try {
        const providerRepository = getManager().getRepository(Provider);
        await providerRepository.save(provider);
        return provider;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const updateProvider = async (id: any, dataToUpdate: any) => {
    try {
        const providerRepository = getManager().getRepository(Provider);
        const providerUpdate = await providerRepository.findOne(id);
        providerUpdate.name = dataToUpdate.name;
        providerUpdate.last_name = dataToUpdate.last_name;
        providerUpdate.email = dataToUpdate.email;
        providerUpdate.company = dataToUpdate.company;
        providerUpdate.country = dataToUpdate.country;
        providerUpdate.city = dataToUpdate.city;
        providerUpdate.address = dataToUpdate.address;
        providerUpdate.phone_number = dataToUpdate.phone_number;
        providerUpdate.items = dataToUpdate.items;
        await providerRepository.save(providerUpdate);
        return await providerRepository.findOne({id});
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const deleteProvider = async (id: any) => {
    try {
        const providerRepository = getManager().getRepository(Provider);
        const data = await providerRepository.delete({id});
        return {ProvidersDeleted : data.affected};
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};
