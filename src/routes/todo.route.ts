import { Router } from 'express';

import * as todoController from '../controllers/todo.controller';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
import * as todoSchema from '../zod-schema/todo.schema';

const router = Router();

// Protect all todo routes
router.use(authenticate);

/**
 * @route GET /api/todos
 * @desc get list of todos
 */
router.get('/', validate(todoSchema.query, 'query'), todoController.getAllTodos);

/**
 * @route GET /api/todos/:id
 * @desc get a todo
 */
router.get('/:id', validate(todoSchema.params, 'params'), todoController.getTodoById);

/**
 * @route POST /api/todos
 * @desc create a todo
 */
router.post('/', validate(todoSchema.create, 'body'), todoController.createTodo);

/**
 * @route PUT /api/todos/:id
 * @desc update a todo
 */
router.put(
  '/:id',
  validate(todoSchema.params, 'params'),
  validate(todoSchema.update, 'body'),
  todoController.updateTodo
);

/**
 * @route DELETE /api/todos/:id
 * @desc delete a todo
 */
router.delete('/:id', validate(todoSchema.params, 'params'), todoController.deleteTodo);

export default router;
