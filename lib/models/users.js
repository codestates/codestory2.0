'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   define association here
    // }
  }
  users.init({
    pictureurl: DataTypes.STRING,
    userId: DataTypes.STRING,
    password: DataTypes.STRING,
    coin: DataTypes.INTEGER,
    word: DataTypes.STRING,
    itemProtection: DataTypes.INTERGER,
    itemTime: DataTypes.INTEGER,
    itemAnswer: DataTypes.INTEGER,
    itemLife: DataTypes.INTEGER,
    itemAvatar: {
      type: DataTypes.INTEGER,
      references: {
        model: 'items',
        key: 'id'
      }
    },
    itemPet: {
      type: DataTypes.INTEGER,
      references: {
        model: 'items',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};