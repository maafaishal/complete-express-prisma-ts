import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const notFoundError = (res: Response, message: string) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message,
  });
};

export const badRequestError = (res: Response, message: string) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    message,
  });
};

export const internalServerError = (res: Response, message: string) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message,
  });
};
