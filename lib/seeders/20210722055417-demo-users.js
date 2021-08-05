'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('users', [{
      userId: 'candyroom',
      password: '12345678',
      pictureurl: 'img.com',
      coin : 15,
      createdAt :'1970-01-01 00:00:01.000000',
      updatedAt :'2021-07-22 00:00:01.000000'
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('users', null, {});
  }
};
