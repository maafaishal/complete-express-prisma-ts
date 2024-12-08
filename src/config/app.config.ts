import { isProd } from '../utils/is-prod';

export const PORT = process.env.PORT || 3000;

export const CORS_OPTIONS = {
  origin: isProd ? process.env.CORS_ORIGIN : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
};
