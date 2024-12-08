import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { PORT, CORS_OPTIONS } from './config/app.config';

import authRoute from './routes/auth.route';
import todoRoute from './routes/todo.route';

const app = express();

app.use(helmet());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoute);
app.use('/api/todos', todoRoute);

app.get('/health', (_, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`[server] Server is running on port ${PORT}`);
});
