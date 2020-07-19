import { Response } from 'express';

export class ErrorHandler extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err: ErrorHandler, res: Response) => {
  const { message } = err;
  const statusCode = err.statusCode ? err.statusCode : 500;
  console.log('handleError -> err.statusCode', err.statusCode)

  res.status(statusCode).json(
    {
      status: 'error',
      statusCode,
      message
    }
  );
};
