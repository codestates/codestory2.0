'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follower_followeds extends Model {}
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