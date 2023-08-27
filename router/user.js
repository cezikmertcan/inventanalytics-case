const express = require('express');
const { getSequelize } = require('../helper/sequelize');
const userRouter = express.Router();
const models = getSequelize().models;
userRouter.get('/', async (req, res) => {
  const users = await models.User.findAll();
  let response = users.map((u) => {
    return { id: u.id, name: u.name };
  });
  res.json(response);
});

userRouter.get('/:UserId', async (req, res) => {
  const { UserId } = req.params;
  let user = await models.User.findByPk(UserId, {
    include: { model: models.UserBook, include: { model: models.Book } },
  });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  user = user.toJSON();
  user.books = {
    past: user.UserBooks.filter((ub) => ub.status == 1).map((ub) => {
      return { name: ub.Book.name, userScore: ub.score };
    }),
    present: user.UserBooks.filter((ub) => ub.status == 0).map((ub) => {
      return { name: ub.Book.name };
    }),
  };
  delete user.UserBooks;
  delete user.createdAt;
  delete user.updatedAt;
  res.json(user);
});

userRouter.post('/', async (req, res) => {
  const { name } = req.body;
  await models.User.create({ name });
  res.status(201).json();
});

userRouter.post('/:UserId/borrow/:BookId', async (req, res) => {
  const { UserId, BookId } = req.params;
  const book = await models.Book.findByPk(BookId, {});
  const user = await models.User.findByPk(UserId, {});
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }
  const isBookBorrowed = await models.UserBook.findOne({
    where: { BookId, status: 0 },
  });
  if (isBookBorrowed)
    res.status(400).json({
      message:
        'This book is borrowed at the moment, so it can not be borrowed.',
    });
  else {
    await models.UserBook.create({ status: 0, UserId, BookId });
    res.status(204).json();
  }
});
userRouter.post('/:UserId/return/:BookId', async (req, res) => {
  const { UserId, BookId } = req.params;
  const { score } = req.body;
  const book = await models.Book.findByPk(BookId);
  const user = await models.User.findByPk(UserId);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }
  const userBook = await models.UserBook.findOne({
    where: { UserId, BookId, status: 0 },
  });
  if (!userBook)
    res.status(400).json({
      message:
        'This book is not borrowed at the moment, so it can not be returned.',
    });
  else {
    await userBook.update({ status: 1, score });
    userBook.save();
    res.status(204).json();
  }
});

module.exports = userRouter;
