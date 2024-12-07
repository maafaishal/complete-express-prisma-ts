import express from 'express';

import 'dotenv/config';

const PORT = process.env.PORT;

const app = express();

app.use((req, res) => {
  console.log('Here');
  res.send({
    title: 'First',
  });
});

app.listen(PORT, () => {
  console.log(`[server] Server is running on port ${PORT}`);
});
