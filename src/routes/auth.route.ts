import { Router } from 'express';

import * as authController from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import * as authSchema from '../zod-schema/auth.schema';

import { asyncHandler } from '../utils/async-handler';

const router = Router();

router.post(
  '/register',
  validate(authSchema.register, 'body'),
  asyncHandler(authController.register)
);

router.post('/login', validate(authSchema.login, 'body'), asyncHandler(authController.login));

export default router;
