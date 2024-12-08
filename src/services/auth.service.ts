import type { User, UserDTO } from '../types/auth';

import * as authRepository from '../repositories/user.repository';

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

  const token = createToken({ id: user.id, email });
  return {
    success: true as const,
    user: toDTO(user),
    token,
  };
};
