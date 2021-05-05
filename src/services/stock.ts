import {updateStock} from "@entity/Stock/StockDao";
import logger from "@shared/Logger";
import {getManager} from "typeorm";
import Stock from "@entity/Stock/Stock";
import LotToStock from "@entity/LotToStock/LotToStock";
import Transaction from '@db/entity/transaction/transaction';
import { createTransaction } from '@helpers/transaction';

export const updateStockSvc = async (id: any, dataToUpdate: any = {}) => {
    try {
        return await updateStock(id, dataToUpdate);
    } catch (e) {
        logger.error("TCL: updateStockSvc -> e", e);
        throw e;
    }
};

export const outputItemStockSvc = async (id: number, amountOutput: number) => {
    try {
        return await getManager().transaction(async (manager) => {
            const deparmentStockResult = await manager.find(Stock,{
                relations : ["LotToStock","item","inventory", "LotToStock.lot"],
                where : {
                    id
                }
            });
            const deparmentStock : Stock = deparmentStockResult[0];
            const lotToStockList = deparmentStock.LotToStock.sort((a , b)=> a.lot.entryDate.valueOf() - b.lot.entryDate.valueOf());
            let amount: number = amountOutput;
            for await (const primaryLotToStock of lotToStockList){
                if(amount === 0) break;
                if(primaryLotToStock.amount === 0) continue;
                if(primaryLotToStock.amount >= amount ){
                    primaryLotToStock.amount -= amount;
                    amount = 0;
                }else{
                    amount -=  primaryLotToStock.amount;
                    primaryLotToStock.amount = 0;
                }
                await manager.save(primaryLotToStock);
            }
            const primaryStockToSave = deparmentStockResult[0];
            primaryStockToSave.amount -= amountOutput;
            console.log(primaryStockToSave);
            const transaction = new Transaction();
            transaction.item = deparmentStock.item;
            transaction.inventory1 = deparmentStock.inventory;
            transaction.amount = amountOutput;
            transaction.date = new Date();
            const bcTransaction = await createTransaction('','',transaction.inventory1.id.toString(),'',transaction.item.id.toString(),transaction.amount,transaction.date.toUTCString());
            transaction.bcTransactionId = bcTransaction.data.id;
            transaction.blockchainTx = bcTransaction.data.transactionHash;
            console.log(transaction)
            await manager.save(transaction);
            return await manager.save(primaryStockToSave);
        });
    } catch (e) {
        logger.error("TCL: outputItemStockSvc -> e", e);
        throw e;
    }
};
