
import logger from '@shared/Logger';
import { ErrorHandler } from '@helpers/ErrorHandler';
import { findBrand } from '@db/entity/Brand/BrandDao';
import { createItem, findAllItems, findItem, updateItem, deleteItem } from '@db/entity/Item/ItemDao';
import { findCategory } from '@db/entity/Category/CategoryDao';
import { findPresentation } from '@db/entity/Presentation/PresentationDao';
import {findGeneralItem} from "@entity/GeneralItem/GeneralItemDao";

export const createItemSvc = async (item: any) => {
  try {
    console.log(item)
    const generalItem= await findGeneralItem({id : item.generalItem});
    if (!generalItem) throw new ErrorHandler(404, "Insumo General no encontrado");
    const brand = await findBrand({id : item.brand});
    if (!brand) throw new ErrorHandler(404, "Marca no encontrada");
    const category = await findCategory({id : item.category});
    if (!category) throw new ErrorHandler(404, "Categoria no encontrada");
    const presentation = await findPresentation({id : item.presentation});
    if (!presentation) throw new ErrorHandler(404, "Presentacion no encontrada");
    return await createItem(item);
  } catch (e) {
    logger.error("TCL: createItemSvc -> e", e);
    throw e;
  }
};

export const findAllItemsSvc = async (criteria: any) => {
  try {
    return await findAllItems(criteria);
  } catch (e) {
    logger.error("TCL: findAllItemsSvc -> e", e);
    throw e;
  }
};

export const findItemSvc = async (criteria: any) => {
  try {
    return await findItem(criteria);
  } catch (e) {
    logger.error("TCL: findItem -> e", e);
    throw e;
  }
};

export const updateItemSvc = async (id: any, dataToUpdate: any = {}) => {
  try {
    return await updateItem(id, dataToUpdate);
  } catch (e) {
    logger.error("TCL: updateItemSvc -> e", e);
    throw e;
  }
};

export const deleteItemSvc = async (id: any) => {
  try {
    return await deleteItem(id);
  } catch (e) {
    logger.error("TCL: deleteItemSvc -> e", e);
    throw e;
  }
};
