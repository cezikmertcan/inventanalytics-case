module.exports = (sequelize) => {
  const { DataTypes, Model } = require('sequelize');
  class UserBook extends Model {}

  UserBook.init(
    {
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        defaultValue: 0,
      },
      UserId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: false },
      BookId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: false },
      score: { type: DataTypes.INTEGER, allowNull: true, primaryKey: false },
    },
    {
      sequelize,
      timestamps: true,
      deletedAt: true,
      modelName: 'UserBook',
    }
  );

  UserBook.associations = () => {
    UserBook.belongsTo(sequelize.models.User, {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    UserBook.belongsTo(sequelize.models.Book, {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };
  return UserBook;
};
