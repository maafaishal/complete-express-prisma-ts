import type { Request, Response } from 'express';
import type { TodoQueryParams } from '../types/todo';

import { StatusCodes } from 'http-status-codes';

import * as todoServices from '../services/todo.service';

import { internalServerError, notFoundError } from '../utils/error-responses';

export const getAllTodos = (req: Request, res: Response) => {
  const query = req.query as Record<string, string | undefined>;

  try {
    const queries: TodoQueryParams = {
      search: query.search,
      completed: String(query.completed) === 'true',
      tags: query.tags?.split(','),
      startDate: query.startDate ? new Date(query.startDate) : undefined,
      endDate: query.endDate ? new Date(query.endDate) : undefined,
      sortBy: (query.sortBy || 'createdAt') as TodoQueryParams['sortBy'],
      sortOrder: (query.sortOrder || 'desc') as TodoQueryParams['sortOrder'],
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
    };

    const data = todoServices.getAllTodos(queries);
    res.json(data);
  } catch (error) {
    internalServerError(res, '[Error fetching todos] ' + error);
  }
};

export const getTodoById = (req: Request, res: Response) => {
  try {
    const todo = todoServices.getTodoById(req.params.id);

    if (!todo) {
      return notFoundError(res, 'Todo not found');
    }

    res.json(todo);
  } catch (error) {
    internalServerError(res, '[Error fetching todo] ' + error);
  }
};

export const createTodo = (req: Request, res: Response) => {
  try {
    const todo = todoServices.createTodo(req.body);

    res.status(StatusCodes.CREATED).json(todo);
  } catch (error) {
    internalServerError(res, '[Error creating todo] ' + error);
  }
};

export const updateTodo = (req: Request, res: Response) => {
  try {
    const todo = todoServices.updateTodo(req.params.id, req.body);

    if (!todo) {
      return notFoundError(res, 'Todo not found');
    }

    res.status(StatusCodes.CREATED).json(todo);
  } catch (error) {
    internalServerError(res, '[Error updating todo] ' + error);
  }
};

export const deleteTodo = (req: Request, res: Response) => {
  try {
    const success = todoServices.deleteTodo(req.params.id);

    if (!success) {
      return notFoundError(res, 'Todo not found');
    }

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    internalServerError(res, '[Error deleting todo] ' + error);
  }
};
