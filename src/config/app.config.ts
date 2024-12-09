import { isProd } from '../utils/is-prod';

export const PORT = process.env.PORT || 3000;

export const CORS_OPTIONS = {
  origin: isProd ? process.env.CORS_ORIGIN : ['http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
};
