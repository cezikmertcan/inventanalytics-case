module.exports = (sequelize) => {
  const { DataTypes, Model } = require('sequelize');
  class User extends Model {}

  User.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.associations = () => {
    User.hasMany(sequelize.models.UserBook);
  };
  return User;
};
