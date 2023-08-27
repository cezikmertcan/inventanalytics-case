const express = require('express');
const { getSequelize } = require('../helper/sequelize');
const bookRouter = express.Router();
const models = getSequelize().models;

bookRouter.get('/', async (req, res) => {
  const books = await models.Book.findAll({
    include: { model: models.UserBook, include: { model: models.User } },
  });
  let response = books.map((b) => {
    return { id: b.id, name: b.name };
  });
  response.forEach((book) => {
    delete book.UserBooks;
  });
  res.json(response);
});
bookRouter.get('/:BookId', async (req, res) => {
  const { BookId } = req.params;
  let book = await models.Book.findByPk(BookId, {
    include: { model: models.UserBook, include: { model: models.User } },
  });
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }
  book = book.toJSON();
  let booksWithScore = book.UserBooks.filter((ub) => ub.status == 1);
  let totalScore = booksWithScore.reduce((sum, ub) => sum + ub.score, 0);
  book.avarageScore =
    booksWithScore.length > 0
      ? (totalScore / booksWithScore.length).toFixed(2)
      : -1;
  book.canBeBorrowed = book.UserBooks.find((ub) => ub.status == 0)
    ? false
    : true;
  res.json({ id: book.id, name: book.name, score: book.avarageScore });
});
bookRouter.post('/', async (req, res) => {
  const { name } = req.body;
  await models.Book.create({ name });
  res.status(201).json();
});

module.exports = bookRouter;
