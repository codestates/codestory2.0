'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'users', 
        'salt',
        {
          type: Sequelize.STRING,
          default: '',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      )
      .then(() => {
        queryInterface.addColumn(
          'users',
          'score',
          {
            type: Sequelize.INTEGER,
            default: 0,
            OnUpdate: 'CASCADE',
            OnDelete: 'CASCADE',
          }
        );
      })
      .then(() => {
        queryInterface.addColumn(
          'users',
          'pictureUrl',
          {
            type: Sequelize.STRING,
            default: '',
            onUpdate: 'CASCADE',
            OnDelete: 'CASCADE'
          }
        );
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        'users', 
        'salt' 
      )
      .then(() => {
        queryInterface.removeColumn(
          'users',
          'score'
        );
      })
      .then(() => {
        queryInterface.removeColumn(
          'users',
          'pictureUrl'
        );
      });
  },
};
