import type { Todo as TodoType } from '@prisma/client';

export type Todo = TodoType;

export type CreateTodoDTO = Pick<Todo, 'title'> &
  Partial<Pick<Todo, 'description' | 'priority' | 'dueDate' | 'tags'>>;

export type UpdateTodoDTO = Partial<
  Pick<Todo, 'title' | 'description' | 'priority' | 'dueDate' | 'tags'>
>;

export interface TodoQueryParams {
  search?: string;
  completed?: boolean;
  priority?: Todo['priority'];
  tags?: string[];
  startDate?: Date;
  endDate?: Date;
  sortBy?: 'createdAt' | 'dueDate' | 'priority';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
