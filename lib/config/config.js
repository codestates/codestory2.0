require('dotenv').config();

module.exports = {
  development: {
    username: process.env.NEXT_PUBLIC_DATABASE_USERNAME,
    password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
    database: 'codestory_development',
    port: '3306',
    host: process.env.NEXT_PUBLIC_DATABASE_URL,
    dialect: 'mysql',
    dialectModule: require('mysql2')
  },
  test: {
    username: process.env.NEXT_PUBLIC_DATABASE_USERNAME,
    password: process.env. NEXT_PUBLIC_DATABASE_PASSWORD,
    database: 'codestory_test',
    port: '3306',
    host: process.env.NEXT_PUBLIC_DATABASE_URL,
    dialect: 'mysql',
    dialectModule: require('mysql2')
  },
  production: {
    username: process.env.NEXT_PUBLIC_DATABASE_USERNAME,
    password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
    database: 'codestory_production',
    port: '3306',
    host: process.env.NEXT_PUBLIC_DATABASE_URL,
    dialect: 'mysql',
    dialectModule: require('mysql2')
  }
};
