import { getManager } from "typeorm";
import { ErrorHandler } from "@helpers/ErrorHandler";
import { Lot } from './Lot';

export const findLot = async (criteria: any) => {
  try {
    const lotRepository = getManager().getRepository(Lot);
    const lot = await lotRepository.findOne({
      relations: ["item", "order"],
      where: criteria,
    });
    return lot;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findAllLots = async (criteria: any) => {
  try {
    const lotRepository = getManager().getRepository(Lot);
    const lot = await lotRepository.find({
      relations: ["item", "order"],
      where: criteria,
    });
    return lot;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};
export const createLot = async (lot : Lot) => {
  try {
    const orderRepository = getManager().getRepository(Lot);
    await orderRepository.save(lot);
    return lot;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const updateLot = async (id: any, dataToUpdate: any) => {
  try {
    const lotRepository = getManager().getRepository(Lot);
    const update = await lotRepository.update(id, { ...dataToUpdate });
    if ((update.affected = 0)) throw new ErrorHandler(404, "Lot not found");
    return await lotRepository.findOne({ id });
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};
