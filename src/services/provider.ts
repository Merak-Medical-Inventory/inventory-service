
import logger from '@shared/Logger';
import { ErrorHandler } from '@helpers/ErrorHandler';
import { createProvider, findAllProviders, findProvider, updateProvider, deleteProvider } from '@db/entity/Provider/ProviderDao';
import {findItem} from '@entity/Item/ItemDao';
import Provider from "@entity/Provider/Provider";

export const createProviderSvc = async (provider: any) => {
    try {
        const itemsSave = [];
        for await (const item of provider.items){
            const it = await findItem({id : item});
            itemsSave.push(it);
            if (!it) throw new ErrorHandler(404, "Item no encontrado");
        }
        provider.items = itemsSave;
        console.log(provider);
        return await createProvider(provider);
    } catch (e) {
        logger.error("TCL: createProviderSvc -> e", e);
        throw e;
    }
};

export const findAllProvidersSvc = async (criteria: any) => {
    try {
        const providers: Provider[] = await findAllProviders(criteria);
        for (const provider of providers){
            const itemsGet = [];
            for(const item of provider.items) {
                const it = await findItem({id: item.id});
                itemsGet.push(it);
                console.log(it.id);
            }
            provider.items = itemsGet;
        }
        return providers;
    } catch (e) {
        logger.error("TCL: findAllProvidersSvc -> e", e);
        throw e;
    }
};

export const findProviderSvc = async (criteria: any) => {
    try {
        const provider: Provider = await findProvider(criteria);
        const itemsGet = [];
        for(const item of provider.items) {
            const it = await findItem({id: item.id});
            itemsGet.push(it);
        }
        provider.items = itemsGet;
        return provider;
    } catch (e) {
        logger.error("TCL: findProvider -> e", e);
        throw e;
    }
};

export const updateProviderSvc = async (id: any, dataToUpdate: any = {}) => {
    try {
        const itemsSave = [];
        for(const item of dataToUpdate.items){
            const it = await findItem({id : item});
            itemsSave.push(it);
            if (!it) throw new ErrorHandler(404, "Item no encontrado");
        }
        dataToUpdate.items = itemsSave;
        return await updateProvider(id, dataToUpdate);
    } catch (e) {
        logger.error("TCL: updateProviderSvc -> e", e);
        throw e;
    }
};

export const deleteProviderSvc = async (id: any) => {
    try {
        return await deleteProvider(id);
    } catch (e) {
        logger.error("TCL: deleteProviderSvc -> e", e);
        throw e;
    }
};
