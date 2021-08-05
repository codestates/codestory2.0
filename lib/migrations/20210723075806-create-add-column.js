'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'users', // name of Target model
        'word', // name of the key we're adding
        {
          type: Sequelize.STRING,
          // setting foreign key relationship
          // setting when primary key is updated or deleted
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        'users', // name of the Target model
        'word' // key we want to remove
      )
  },
};