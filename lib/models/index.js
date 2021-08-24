'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = 'index.js';
console.log('__filename', __filename);
console.log('__dirname', __dirname);
console.log('basename', basename);
const dirname = './lib/models';
const env = 'development';
const config = require('../config/config.js')[env];
const db = {};

const models = path.join(process.cwd(), '/lib/models/');
console.log('config', config);
console.log('models', models);

let sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(models)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(`./${file}`)(sequelize, Sequelize.DataTypes);
    console.log('model', model);
    console.log('file', file);
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