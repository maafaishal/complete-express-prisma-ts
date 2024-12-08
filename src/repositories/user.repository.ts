import type { User, CreateDTO } from '../types/auth';

import { prisma } from '../utils/prisma';

export const findByEmail = async (email: User['email']) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const create = async (data: CreateDTO) => {
  return prisma.user.create({ data });
};
