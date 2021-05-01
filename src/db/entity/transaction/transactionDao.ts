import { getManager } from 'typeorm';
import Transaction from '@db/entity/transaction/transaction';
import { ErrorHandler } from '@helpers/ErrorHandler';

export const findAllTransactions = async () => {
  try {
    const transactionRepository = getManager().getRepository(Transaction);
    return await transactionRepository.find({
      relations: ['sender', 'inventory1','inventory2','item', 'item.generalItem', 'item.category', 'item.brand',
        'item.presentation'],
      order : {
        date : 'DESC'
      }
  })
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findInventoryTransactions = async (inventoryId: number) => {
  try {
    const transactionRepository = getManager().getRepository(Transaction);
    return await transactionRepository.find({
      relations: ['sender', 'inventory1','inventory2','item', 'item.generalItem', 'item.category', 'item.brand',
        'item.presentation'],
      where: [{
          inventory1: inventoryId
        },
        {
          inventory2: inventoryId
        }]
  })
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const createTransaction = async (transaction: any) => {
  try {
    const transactionRepository = getManager().getRepository(Transaction);
    await transactionRepository.save(transaction);
    return transaction;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const updateTransaction = async (id: any, dataToUpdate: any) => {
  try {
    const transactionRepository = getManager().getRepository(Transaction);
    const update = await transactionRepository.update(id,{...dataToUpdate });
    if(update.affected = 0) throw new ErrorHandler(404, 'Transaction not found');
    return await transactionRepository.findOne({id});
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const deleteTransaction = async (id: any) => {
  try {
    const transactionRepository = getManager().getRepository(Transaction);
    const data = await transactionRepository.delete({id});
    return {transactionsDeleted : data.affected};
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};
