'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scripts extends Model {}
  scripts.init({
    stage: DataTypes.STRING,
    content: DataTypes.STRING,
    answer: DataTypes.STRING,
    hint: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'scripts',
  });
  return scripts;
};