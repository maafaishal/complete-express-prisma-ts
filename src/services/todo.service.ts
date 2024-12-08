import type {
  Todo,
  CreateTodoDTO,
  UpdateTodoDTO,
  TodoQueryParams,
  PaginatedResponse,
} from '../types/todo';

import type { User } from '../types/auth';

import * as todoRepository from '../repositories/todo.repository';

const todoArr: Todo[] = [];

export const getAllTodos = (queryParams: TodoQueryParams): PaginatedResponse<Todo> => {
  let filteredTodos = [...todoArr];

  // Apply filters
  if (queryParams.search) {
    const searchTerm = queryParams.search.toLowerCase();

    filteredTodos = filteredTodos.filter(todo => {
      return (
        todo.title.toLowerCase().includes(searchTerm) ||
        todo.description?.toLowerCase().includes(searchTerm)
      );
    });
  }

  if (queryParams.completed !== undefined) {
    filteredTodos = filteredTodos.filter(todo => {
      return todo.completed === queryParams.completed;
    });
  }

  if (queryParams.tags?.length) {
    filteredTodos = filteredTodos.filter(todo => {
      return todo.completed === queryParams.completed;
    });
  }

  if (queryParams.startDate) {
    filteredTodos = filteredTodos.filter(todo => {
      return todo.createdAt >= queryParams.startDate!;
    });
  }

  if (queryParams.endDate) {
    filteredTodos = filteredTodos.filter(todo => {
      return todo.createdAt <= queryParams.endDate!;
    });
  }

  // Apply sorting

  const total = filteredTodos.length;
  const totalPages = Math.ceil(total / queryParams.limit!);
  const start = (queryParams.page! - 1) * queryParams.limit!;
  const end = start + queryParams.limit!;

  const paginatedTodos = filteredTodos.slice(start, end);

  return {
    data: paginatedTodos,
    pagination: {
      total,
      page: queryParams.page!,
      limit: queryParams.limit!,
      totalPages,
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
