import 'dotenv/config';

import express from 'express';

import todoRoute from './routes/todo.route';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/api/todos', todoRoute);

app.listen(PORT, () => {
  console.log(`[server] Server is running on port ${PORT}`);
});
