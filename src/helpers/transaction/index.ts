import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {findItemSvc} from "@services/item";
import {findInventorySvc} from "@services/inventory";

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
    response.data.item = findItemSvc({id:response.data.item});
    response.data.inventory1 = findInventorySvc({id:response.data.inventory1});
    response.data.inventory2 = findInventorySvc({id:response.data.inventory2});
    return response.data;
  } catch (e) {
    throw e;
  }
};
