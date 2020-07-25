import { getManager, getConnection } from "typeorm";
import { Presentation } from "@db/entity/Presentation/Presentation";
import { ErrorHandler } from "@helpers/ErrorHandler";

export const createPresentation = async (presentation: any) => {
  try {
    const PresentationRepository = getManager().getRepository(Presentation);
    await PresentationRepository.save(presentation);
    return presentation;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findPresentation = async (criteria: any) => {
  try {
    const presentationRepository = getManager().getRepository(Presentation);
    return await presentationRepository.findOne({
      where: criteria
    });
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findAllPresentations = async () => {
  try {
    const PresentationRepository = getManager().getRepository(Presentation);
    const presentations = await PresentationRepository.find();
    return presentations;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const updatePresentation = async (id: any, dataToUpdate: any) => {
  try {
    const PresentationRepository = getManager().getRepository(Presentation);
    const update = await PresentationRepository.update(id, { ...dataToUpdate });
    if (update.affected === 0)
      throw new ErrorHandler(404, "Presentation not found");
    return await PresentationRepository.findOne({ id });
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const deletePresentation = async (id: any) => {
  try {
    const PresentationRepository = getManager().getRepository(Presentation);
    const data = await PresentationRepository.delete({ id });
    return { PresentationsDeleted: data.affected };
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};
