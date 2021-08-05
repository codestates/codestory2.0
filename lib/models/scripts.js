'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scripts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   define association here
    // }
  }
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