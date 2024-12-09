import type { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { internalServerError } from '../utils/error-responses';

import * as authServices from '../services/auth.service';

const setAuthCookie = (res: Response, token: string) => {
  res.cookie('UID', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });
};

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

    setAuthCookie(res, token);

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

    setAuthCookie(res, token);

    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    internalServerError(res, '[Error when trying to login] ' + error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.UID || '';

    if (token) {
      await authServices.logout(token);
    }

    res.clearCookie('UID');

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    internalServerError(res, '[Error when trying to logout] ' + error);
  }
};
