export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTodo = Pick<Todo, 'title'> & Partial<Pick<Todo, 'description' | 'tags'>>;

export type UpdateTodo = Partial<Pick<Todo, 'title' | 'description' | 'completed' | 'tags'>>;

export interface TodoQueryParams {
  search?: string;
  completed?: boolean;
  tags?: string[];
  startDate?: Date;
  endDate?: Date;
  sortBy?: 'createdAt' | 'title';
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
