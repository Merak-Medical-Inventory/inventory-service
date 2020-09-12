import { getManager } from "typeorm";
import Privilege from "@db/entity/Privilege/Privilege";
import { ErrorHandler } from '@helpers/ErrorHandler';

export const createPrivilege = async (privilege: any) => {
  try {
    const userRepository = getManager().getRepository(Privilege);
    await userRepository.save(privilege);
    return privilege;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findAllPrivilege = async (criteria: any) => {
  try {
    const privilegeRepository = getManager().getRepository(Privilege);
    const privilege = await privilegeRepository.find({where : criteria});
    return privilege;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findPrivilege = async (criteria: any) => {
  try {
    const privilegeRepository = getManager().getRepository(Privilege);
    const privilege = await privilegeRepository.findOne({where : criteria});
    return privilege;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const deletePrivilege = async (id: any) => {
  try {
    const privilegeRepository = getManager().getRepository(Privilege);
    const privilege = await privilegeRepository.delete({id});
    return {privilegesDeleted : privilege.affected};
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};