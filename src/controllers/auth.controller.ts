import type { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { internalServerError } from '../utils/error-responses';

import * as authServices from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { success, message, user, token } = await authServices.register(
      req.body.email,
      req.body.password,
      req.body.name
    );

    if (!success) {
      return res.status(StatusCodes.CONFLICT).json({
        message: message,
      });
    }

    res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    internalServerError(res, '[Error registering a user] ' + error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { success, message, user, token } = await authServices.login(
      req.body.email,
      req.body.password
    );

    if (!success) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: message,
      });
    }

    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    internalServerError(res, '[Error when trying to login] ' + error);
  }
};
