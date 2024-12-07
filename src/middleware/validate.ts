import type { Request, Response, NextFunction } from 'express';
import { ZodError, type AnyZodObject } from 'zod';

import { StatusCodes } from 'http-status-codes';

import { errorMessage } from '../utils/error-message';

type Target = 'body' | 'params' | 'query';

export const validate =
  (schema: AnyZodObject, target: Target) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req[target]);
      next();
    } catch (error) {
      if (!(error instanceof ZodError)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: errorMessage(error),
        });
        return;
      }

      const validationErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Validation failed',
        details: validationErrors,
      });
    }
  };
