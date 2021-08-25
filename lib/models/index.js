'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = 'index.js';
const env = 'development';
const db = {};
const config = require('../config/config')[env];
const dirname = path.join(process.cwd(),'lib/models');

let sequelize = new Sequelize(
  config.database, 
  config.username,
  config.password,
  config
);

fs
  .readdirSync(dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(`./${file}`)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
