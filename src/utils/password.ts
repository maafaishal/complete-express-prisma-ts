import type { User } from '../types/auth';

import argon2 from 'argon2';

export const hashPassword = async (password: User['password']) => {
  return await argon2.hash(password);
};

export const verifyPassword = async (password: User['password'], hash: string) => {
  try {
    return await argon2.verify(hash, password);
  } catch {
    return false;
  }
};
