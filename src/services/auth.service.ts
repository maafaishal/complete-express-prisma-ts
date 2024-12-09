import type { Token } from '@prisma/client';
import { TokenType } from '@prisma/client';

import type { User, UserDTO } from '../types/auth';

import * as authRepository from '../repositories/user.repository';
import * as tokenRepository from '../repositories/token.repository';

import { hashPassword, verifyPassword } from '../utils/password';
import { createToken } from '../utils/token';

const toDTO = (userData: User): UserDTO => {
  const { id, email, name } = userData;

  return {
    id,
    email,
    name,
  };
};

const storeToken = (token: Token['token'], userId: User['id']) => {
  const expires = new Date();
  expires.setHours(expires.getHours() + 24);

  return tokenRepository.create({
    token,
    type: TokenType.ACCESS,
    expires,
    userId,
  });
};

export const register = async (
  email: User['email'],
  password: User['password'],
  name: User['name']
) => {
  const existingUser = await authRepository.findByEmail(email);

  if (existingUser) {
    return {
      success: false as const,
      message: 'Email already registered',
    };
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await authRepository.create({
    email,
    name,
    password: hashedPassword,
  });

  const token = createToken({ id: newUser.id, email });
  await storeToken(token, newUser.id);

  return {
    success: true as const,
    user: toDTO(newUser),
    token,
  };
};

export const login = async (email: User['password'], password: User['password']) => {
  const user = await authRepository.findByEmail(email);

  if (!user) {
    return {
      success: false as const,
      message: 'Invalid credentials',
    };
  }

  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    return {
      success: false as const,
      message: 'Invalid credentials',
    };
  }

  await tokenRepository.deleteByUserId(user.id);

  const token = createToken({ id: user.id, email });
  await storeToken(token, user.id);

  return {
    success: true as const,
    user: toDTO(user),
    token,
  };
};

export const logout = async (token: string) => {
  await tokenRepository.deleteByToken(token);
};

export const validateToken = async (token: string) => {
  const storedToken = await tokenRepository.findByToken(token);

  if (!storedToken) {
    return {
      success: false as const,
      message: 'Invalid or expired token',
    };
  }

  if (storedToken.expires < new Date()) {
    return {
      success: false as const,
      message: 'Invalid or expired token',
    };
  }

  return {
    success: true as const,
    email: storedToken.user.email,
    userId: storedToken.user.id,
  };
};
