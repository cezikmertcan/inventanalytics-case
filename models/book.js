const book = (sequelize) => {
  const { DataTypes, Model } = require('sequelize');
  class Book extends Model {}

  Book.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Book',
    }
  );
  Book.associations = () => {
    Book.hasMany(sequelize.models.UserBook);
  };
  return Book;
};
module.exports = book;
