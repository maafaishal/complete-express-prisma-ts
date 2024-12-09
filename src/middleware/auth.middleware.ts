import type { NextFunction, Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { verifyToken } from '../utils/token';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.UID || '';

    if (!token) {
      throw Error();
    }

    const decodedToken = verifyToken(token);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = decodedToken;

    next();
  } catch {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};
