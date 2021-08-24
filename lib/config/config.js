require('dotenv').config();

module.exports = {
  development: {
    username: 'codestory',
    password: 'codeqrwt173',
    database: 'codestory_development',
    host: 'codestory-database.cwkawqeb4twy.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql'
  },
  test: {
    username: process.env.NEXT_PUBLIC_DATABASE_USERNAME,
    password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
    database: 'codestory_test',
    host: process.env.NEXT_PUBLIC_DATABASE_URL,
    dialect: 'mysql'
  },
  production: {
    username: process.env.NEXT_PUBLIC_DATABASE_USERNAME,
    password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
    database: 'codestory_production',
    host: process.env.NEXT_PUBLIC_DATABASE_URL,
    dialect: 'mysql'
  }
};