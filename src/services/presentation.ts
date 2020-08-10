import {
    createPresentation,
    findPresentation,
    findAllPresentations,
    updatePresentation,
    deletePresentation
} from '@db/entity/Presentation/PresentationDao';
import logger from '@shared/Logger';

export const createPresentationSvc = async (Presentation: any) => {
    try {
        return await createPresentation(Presentation);
    } catch (e) {
        console.error('TCL: createPresentationSvc -> e', e);
        throw e;
    }
};

export const findPresentationSvc = async (criteria: any) => {
    try {
        return await findPresentation(criteria);
    } catch (e) {
        console.error('TCL: findPresentationSvc -> e', e);
        throw e;
    }
};

export const findAllPresentationsSvc = async () => {
    try {
        return await findAllPresentations();
    } catch (e) {
        console.error('TCL: findAllPresentationsSvc -> e', e);
        throw e;
    }
};

export const updatePresentationSvc = async (id: any, dataToUpdate: any = {}) => {
    try {
        return await updatePresentation(id, dataToUpdate);
    } catch (e) {
        logger.error('TCL: updatePresentationSvc -> e', e);
        throw e;
    }
};

export const deletePresentationSvc = async (id: any) => {
    try {
        return await deletePresentation(id);
    } catch (e) {
        logger.error('TCL: deletePresentationSvc -> e', e);
        throw e;
    }
};
