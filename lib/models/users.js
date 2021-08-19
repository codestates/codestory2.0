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
    pictureUrl: {
      type: DataTypes.STRING,
      default: ''
    },
    userId: DataTypes.STRING,
    password: DataTypes.STRING,
    coin: DataTypes.INTEGER,
    word: DataTypes.STRING,
    score: {
      type: DataTypes.INTEGER,
      default: 0
    },
    salt: {
      type: DataTypes.STRING,
      default: ''
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};