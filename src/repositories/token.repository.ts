import type { Token, User } from '@prisma/client';

import { prisma } from '../utils/prisma';

export const findByToken = async (token: Token['token']) => {
  return prisma.token.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });
};

export const create = async (data: {
  token: Token['token'];
  type: Token['type'];
  expires: Token['expires'];
  userId: User['id'];
}) => {
  return prisma.token.create({ data });
};

export const deleteExpired = async () => {
  await prisma.token.deleteMany({
    where: {
      expires: {
        lt: new Date(),
      },
    },
  });
};

export const deleteByUserId = async (userId: User['id']) => {
  await prisma.token.deleteMany({
    where: {
      userId,
    },
  });
};

export const deleteByToken = async (token: Token['token']) => {
  await prisma.token.deleteMany({
    where: {
      token,
    },
  });
};
