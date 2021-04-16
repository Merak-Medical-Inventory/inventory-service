import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

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
  type: string
) => {
  try {
    const response = await blockchainInstance.post("/api/transaction", {
      sender,
      receiver,
      inventory1,
      inventory2,
      item,
      amount,
      type,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getBcTransactionSvc = async (id: string) => {
  try {
    const response = await blockchainInstance.get(`/api/transaction/${id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};
