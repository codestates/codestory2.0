'use strict';

// const { Model } = require('sequelize');
// const Sequelize = require('sequelize');
// const db = {};

// let sequelize = new Sequelize(
//   'codestory_development', 
//   'codestory',
//   'codeqrwt173',
//   {
//     username: 'codestory',
//     password: 'codeqrwt173',
//     database: 'codestory_development',
//     host: 'codestory-database.cwkawqeb4twy.ap-northeast-2.rds.amazonaws.com',
//     dialect: 'mysql'
//   }
// );
// const models = [
//   (sequelize, DataTypes) => {
//     class follower_followeds extends Model {}
//     follower_followeds.init({
//       followerId: {
//         type : DataTypes.INTEGER,
//         references: {
//           model: 'users',
//           key: 'id'
//         }
//       },
//       followedId: {
//         type : DataTypes.INTEGER,
//         references: {
//           model: 'users',
//           key: 'id'
//         }
//       }
//     }, {
//       sequelize,
//       modelName: 'follower_followeds',
//     });
    
//     return follower_followeds;
//   },
//   (sequelize, DataTypes) => {
//     class scripts extends Model {}
//     scripts.init({
//       stage: DataTypes.STRING,
//       content: DataTypes.STRING,
//       answer: DataTypes.STRING,
//       hint: DataTypes.TEXT
//     }, {
//       sequelize,
//       modelName: 'scripts',
//     });
//     return scripts;
//   },
//   (sequelize, DataTypes) => {
//     class users extends Model {}
//     users.init({
//       pictureUrl: {
//         type: DataTypes.STRING,
//         default: ''
//       },
//       userId: DataTypes.STRING,
//       password: DataTypes.STRING,
//       coin: DataTypes.INTEGER,
//       word: DataTypes.STRING,
//       score: {
//         type: DataTypes.INTEGER,
//         default: 0
//       },
//       salt: {
//         type: DataTypes.STRING,
//         default: ''
//       }
//     }, {
//       sequelize,
//       modelName: 'users',
//     });
//     return users;
//   }
// ];

// models
//   .forEach(file => {
//     const model = file(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

const db = {
  users: '안녕, 난 test user야',
  sciprts: '안녕, 난 test scripts야',
  follower_followeds: '안녕 난 test follower_followeds야'
};

module.exports = db;