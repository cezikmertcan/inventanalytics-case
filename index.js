const express = require('express');
const userRouter = require('./router/user');
const bookRouter = require('./router/book');
const { initalizeSequelize, getSequelize } = require('./helper/sequelize');
(async () => {
  const app = express();
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/books', bookRouter);
  const s = await initalizeSequelize();
  if (!s) process.exit(0);
  if (process.env.INITDB) {
    console.log('Initializing database');
    await getSequelize().dropAllSchemas();
    await getSequelize().sync({ force: true });
    console.log('Databas is initialized successfully.');
    process.exit(0);
  } else {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`App listening on port ${process.env.SERVER_PORT}`);
    });
  }
})();
