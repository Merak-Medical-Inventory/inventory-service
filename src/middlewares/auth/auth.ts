import { get } from 'lodash'
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { ErrorHandler } from '@helpers/ErrorHandler'

interface IRequest extends Request {
  [key: string]: any;
}

export const sessionCheck = async (req: IRequest, _res: Response, next: NextFunction) => {
  const authAxiosConfig: AxiosRequestConfig = {
    baseURL: process.env.AUTH_HOST,
    timeout: 10000,
    timeoutErrorMessage: 'Auth request time exceeded'
  };
  
  if(!req.headers['authorization']) throw new ErrorHandler(401, 'no authorization token');
  const config = {
    authorization: req.headers['authorization']
  }

  authAxiosConfig.headers = config

  const authInstance: AxiosInstance = axios.create(authAxiosConfig);
  let response
  try {
    response = await authInstance.get('/api/auth/check')
    console.log('sessionCheck -> response', response.data)
    process.env.USER_ID = get(response, 'data.data.id', 0)
    process.env.USER_USERNAME = get(response, 'data.data.username', 0)
    process.env.USER_NAME = get(response, 'data.data.name', 0)
    process.env.USER_LASTNAME = get(response, 'data.data.last_name', 0)
    process.env.USER_EMAIL = get(response, 'data.data.email', 0)
    process.env.ROL_ID = get(response, 'data.data.rol.id', 0)
    process.env.ROL_NAME = get(response, 'data.data.rol.name', 0)
    next()
  } catch (error) {
    next(new ErrorHandler(401, error.message));
  }
};
