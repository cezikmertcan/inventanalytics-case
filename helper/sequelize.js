const { Sequelize } = require('sequelize');
const book = require('../models/book');
const user = require('../models/user');
const userBook = require('../models/userBook');
require('dotenv').config();
const sequelize = new Sequelize({
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  // logging: null,
});
const getSequelize = () => sequelize;
const initalizeSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return null;
  }
  const UserBook = userBook(sequelize);
  const User = user(sequelize);
  const Book = book(sequelize);
  User.associations();
  Book.associations();
  UserBook.associations();
  return sequelize;
};

module.exports = { initalizeSequelize, getSequelize };
