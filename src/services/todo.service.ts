import type {
  Todo,
  CreateTodo,
  TodoQueryParams,
  UpdateTodo,
  PaginatedResponse,
} from '../types/todo';

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

export const getTodoById = (id: string) => {
  return todoArr.find(todo => todo.id === id);
};

export const createTodo = (todoData: CreateTodo) => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    title: todoData.title,
    description: todoData.description || '',
    completed: false,
    tags: todoData.tags || [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  todoArr.push(newTodo);
  return newTodo;
};

export const updateTodo = (id: string, todoData: UpdateTodo) => {
  const todoIdx = todoArr.findIndex(todo => todo.id === id);

  if (todoIdx === -1) return undefined;

  const newTodo: Todo = {
    ...todoArr[todoIdx],
    ...todoData,
    updatedAt: new Date(),
  };

  todoArr[todoIdx] = newTodo;

  return newTodo;
};

export const deleteTodo = (id: string) => {
  const todoIdx = todoArr.findIndex(todo => todo.id === id);

  if (todoIdx === -1) return false;

  todoArr.splice(todoIdx, 1);

  return true;
};
