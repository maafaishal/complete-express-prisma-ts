import type { TokenPayload } from '../types/auth';

import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/auth.config';

export const createToken = (payload: TokenPayload) => {
  return jwt.sign(payload, JWT_CONFIG.secret, { expiresIn: JWT_CONFIG.expiresIn });
};
