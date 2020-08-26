import { getManager } from "typeorm";
import Item from "@db/entity/Item/Item";
import { ErrorHandler } from "@helpers/ErrorHandler";

export const findAllItems = async (criteria: any) => {
  try {
    const itemRepository = getManager().getRepository(Item);
    return await itemRepository.find({
      relations: ["generalItem","category","brand","presentation"],
      where: criteria
  })
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findItem = async (criteria: any) => {
  try {
    const itemRepository = getManager().getRepository(Item);
    return await itemRepository.findOne({
      relations: ["generalItem","category","brand","presentation"],
      where: criteria
  })
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const createItem = async (item: any) => {
  try {
    const itemRepository = getManager().getRepository(Item);
    await itemRepository.save(item);
    return item;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const updateItem = async (id: any, dataToUpdate: any) => {
  try {
    const itemRepository = getManager().getRepository(Item);
    const update = await itemRepository.update(id,{...dataToUpdate });
    if(update.affected === 0) throw new ErrorHandler(404, "Item not found");
    return await itemRepository.findOne({id});
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const deleteItem = async (id: any) => {
  try {
    const itemRepository = getManager().getRepository(Item);
    const data = await itemRepository.delete({id});
    return {itemsDeleted : data.affected};
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};
