import type { Request, Response } from 'express';
import type { TodoQueryParams } from '../types/todo';

import { StatusCodes } from 'http-status-codes';

import * as todoServices from '../services/todo.service';

import { internalServerError, notFoundError } from '../utils/error-responses';

export const getAllTodos = async (req: Request, res: Response) => {
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data = await todoServices.getAllTodos(req.user!.id, queries);

    res.json(data);
  } catch (error) {
    internalServerError(res, '[Error fetching todos] ' + error);
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const todo = todoServices.getTodoById(req.user!.id, req.params.id);

    if (!todo) {
      return notFoundError(res, 'Todo not found');
    }

    res.json(todo);
  } catch (error) {
    internalServerError(res, '[Error fetching todo] ' + error);
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const todo = await todoServices.createTodo(req.user!.id, req.body);

    res.status(StatusCodes.CREATED).json(todo);
  } catch (error) {
    internalServerError(res, '[Error creating todo] ' + error);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const todo = await todoServices.updateTodo(req.user!.id, req.params.id, req.body);

    if (!todo) {
      return notFoundError(res, 'Todo not found');
    }

    res.status(StatusCodes.CREATED).json(todo);
  } catch (error) {
    internalServerError(res, '[Error updating todo] ' + error);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const success = await todoServices.deleteTodo(req.user!.id, req.params.id);

    if (!success) {
      return notFoundError(res, 'Todo not found');
    }

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    internalServerError(res, '[Error deleting todo] ' + error);
  }
};
