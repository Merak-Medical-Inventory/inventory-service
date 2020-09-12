import { getManager } from 'typeorm';
import User from '@db/entity/user/User';
import { findPrivilege } from '@db/entity/Privilege/PrivilegeDao';
import { ErrorHandler } from '@helpers/ErrorHandler';

export const findAllUser = async (criteria: any) => {
  try {
    const userRepository = getManager().getRepository(User);
    return await userRepository.find({
      relations: ['rol', 'department'],
      where: criteria
  })
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findUser = async (criteria: any) => {
  try {
    const userRepository = getManager().getRepository(User);
    return await userRepository.findOne({
      relations: ['rol', 'department'],
      where: criteria
  })
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const createUser = async (user: any) => {
  try {
    const userRepository = getManager().getRepository(User);
    await userRepository.save(user);
    return user;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const updateUser = async (id: any, dataToUpdate: any) => {
  try {
    const userRepository = getManager().getRepository(User);
    const update = await userRepository.update(id,{...dataToUpdate });
    if(update.affected = 0) throw new ErrorHandler(404, 'User not found');
    return await userRepository.findOne({id});
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const deleteUser = async (id: any) => {
  try {
    const userRepository = getManager().getRepository(User);
    const data = await userRepository.delete({id});
    return {usersDeleted : data.affected};
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};
