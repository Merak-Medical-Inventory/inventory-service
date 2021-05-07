import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {findItemSvc} from "@services/item";
import {findBasicInventory} from "@entity/Inventory/InventoryDao";

const blockchainAxiosConfig: AxiosRequestConfig = {
  baseURL: process.env.BLOCKCHAIN_HOST,
  timeout: 10000,
  timeoutErrorMessage: "Blockchain request time exceeded",
  headers: {
    "x-api-token": `${process.env.API_TOKEN}`,
  },
};

const blockchainInstance: AxiosInstance = axios.create(blockchainAxiosConfig);

export const createTransaction = async (
  sender: string,
  receiver: string,
  inventory1: string,
  inventory2: string,
  item: string,
  amount: number,
  date : string
) => {
  try {
    const response = await blockchainInstance.post("/api/transaction", {
      sender,
      receiver,
      inventory1,
      inventory2,
      item,
      amount,
      date
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getBcTransactionSvc = async (id: string) => {
  try {
    const response = await blockchainInstance.get(`/api/transaction/${id}`);
    console.log(response.data.data);
    response.data.data.item = await findItemSvc({id:response.data.data.item});
    if (response.data.data.inventory1 !== '') {
      response.data.data.inventory1 = await findBasicInventory({id:response.data.data.inventory1});
    }
    if (response.data.data.inventory2 !== '') {
      response.data.data.inventory2 = await findBasicInventory({id: response.data.data.inventory2});
    }
    console.log(response);
    return response.data;
  } catch (e) {
    throw e;
  }
};
