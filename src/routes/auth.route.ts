import { Router } from 'express';

import * as authController from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
import * as authSchema from '../zod-schema/auth.schema';

import { asyncHandler } from '../utils/async-handler';

const router = Router();

router.post(
  '/register',
  validate(authSchema.register, 'body'),
  asyncHandler(authController.register)
);

router.post('/login', validate(authSchema.login, 'body'), asyncHandler(authController.login));

router.post('/logout', authenticate, asyncHandler(authController.logout));

export default router;
