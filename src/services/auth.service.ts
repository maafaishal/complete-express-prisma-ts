import type { User, UserDTO } from '../types/auth';

import { v4 as uuidv4 } from 'uuid';
import { hashPassword, verifyPassword } from '../utils/password';
import { createToken } from '../utils/token';

const userArr: User[] = [];

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
  const existingUser = userArr.find(user => user.email === email);

  if (existingUser) {
    return {
      success: false as const,
      message: 'Email already registered',
    };
  }

  const hashedPassword = await hashPassword(password);

  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  userArr.push(newUser);

  const token = createToken({ id: newUser.id, email });
  return {
    success: true as const,
    user: toDTO(newUser),
    token,
  };
};

export const login = async (email: User['password'], password: User['password']) => {
  const user = userArr.find(user => user.email === email);

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
