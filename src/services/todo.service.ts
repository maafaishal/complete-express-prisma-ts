import type {
  Todo,
  CreateTodoDTO,
  UpdateTodoDTO,
  TodoQueryParams,
  PaginatedResponse,
} from '../types/todo';

import type { User } from '../types/auth';

import * as todoRepository from '../repositories/todo.repository';

export const getAllTodos = async (
  userId: User['id'],
  queryParams: TodoQueryParams
): Promise<PaginatedResponse<Todo>> => {
  const [data, total] = await todoRepository.findAll(userId, queryParams);

  const limit = queryParams.limit || 10;
  const page = queryParams.page || 1;

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getTodoById = async (userId: User['id'], id: string) => {
  return todoRepository.findById(userId, id);
};

export const createTodo = async (userId: User['id'], todoData: CreateTodoDTO) => {
  const newTodo = {
    title: todoData.title,
    description: todoData.description || '',
    completed: false,
    tags: todoData.tags || [],
  };

  return todoRepository.create(userId, newTodo);
};

export const updateTodo = async (userId: User['id'], id: string, todoData: UpdateTodoDTO) => {
  const existingTodo = await todoRepository.findById(userId, id);

  if (!existingTodo) return undefined;

  return todoRepository.update(existingTodo.id, todoData);
};

export const deleteTodo = async (userId: User['id'], id: string) => {
  const existingTodo = await todoRepository.findById(userId, id);

  if (!existingTodo) return false;

  await todoRepository.deleteData(userId, id);

  return true;
};
