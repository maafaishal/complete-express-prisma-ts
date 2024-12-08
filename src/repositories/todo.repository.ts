import type { Todo, CreateTodoDTO, UpdateTodoDTO, TodoQueryParams } from '../types/todo';
import type { User } from '../types/auth';

import { prisma } from '../utils/prisma';

export const findAll = async (userId: User['id'], queryParams: TodoQueryParams) => {
  const [todos, total] = await Promise.all([
    prisma.todo.findMany({
      where: {
        userId,
        ...(queryParams.search && {
          OR: [
            { title: { contains: queryParams.search, mode: 'insensitive' } },
            { description: { contains: queryParams.search, mode: 'insensitive' } },
          ],
        }),
        ...(queryParams.completed !== undefined && { completed: queryParams.completed }),
        ...(queryParams.priority && { priority: queryParams.priority }),
        ...(queryParams.tags?.length && { tags: { hasEvery: queryParams.tags } }),
        ...(queryParams.startDate && { createdAt: { gte: queryParams.startDate } }),
        ...(queryParams.endDate && { createdAt: { lte: queryParams.endDate } }),
      },
      orderBy: {
        [queryParams.sortBy || 'createdAt']: queryParams.sortOrder || 'desc',
      },
      skip: ((queryParams.page || 1) - 1) * (queryParams.limit || 10),
      take: queryParams.limit || 10,
    }),
    prisma.todo.count(),
  ]);

  return [todos, total];
};

export const findById = async (userId: User['id'], id: Todo['id']) => {
  return prisma.todo.findUnique({
    where: {
      id,
      userId,
    },
  });
};

export const create = async (userId: User['id'], data: CreateTodoDTO) => {
  return prisma.todo.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const update = async (id: Todo['id'], data: UpdateTodoDTO) => {
  return prisma.todo.update({ where: { id }, data });
};

export const deleteData = async (userId: User['id'], id: Todo['id']) => {
  return prisma.todo.delete({ where: { id, userId } });
};
