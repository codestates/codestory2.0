'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follower_followeds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   define association here
    // }
  }
  follower_followeds.init({
    followerId: {
      type : DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    followedId: {
      type : DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'follower_followeds',
  });
  
  return follower_followeds;
};