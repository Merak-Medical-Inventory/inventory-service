import { getManager } from "typeorm";
import Rol from "@db/entity/Rol/Rol";
import { ErrorHandler } from '@helpers/ErrorHandler';

export const createRol = async (rol: any) => {
  try {
    const rolRepository = getManager().getRepository(Rol);
    await rolRepository.save(rol);
    return rol;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findAllRols = async (criteria: any) => {
  try {
    const rolRepository = getManager().getRepository(Rol);
    const rol = await rolRepository.find({
      relations: ["privileges"],
      where: criteria
  });
    return rol;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findRol = async (criteria: any) => {
  try {
    const rolRepository = getManager().getRepository(Rol);
    const rol = await rolRepository.findOne({
      relations: ["privileges"],
      where: criteria
  });
    return rol;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const deleteRol = async (id: any) => {
  try {
    const rolRepository = getManager().getRepository(Rol);
    const rol = await rolRepository.delete({id});
    return {rolsDeleted : rol.affected};
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};