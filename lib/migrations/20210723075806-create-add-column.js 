'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'users',
        'word', 
        {
          type: Sequelize.STRING,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        'users', 
        'word'
      );
  },
};