'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {}
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