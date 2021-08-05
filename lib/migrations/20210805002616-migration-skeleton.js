'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'users', 
        'itemProtection', 
        {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      )
      .then(() => 
        queryInterface.addColumn(
          'users',
          'itemTime',
          {
            type: Sequelize.INTEGER,
            defaultValue: 0
          }
        )
      )
      .then(() => 
        queryInterface.addColumn(
        'users',
        'itemAnswer',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0
         }
        )
      )
      .then(() => 
        queryInterface.addColumn(
          'users',
          'itemLife',
          {
            type: Sequelize.INTEGER,
            defaultValue: 0
          }
        )
      )
      .then(() => 
        queryInterface.addColumn(
          'users',
          'itemAvatar',
          {
            type: Sequelize.INTEGER,
          }
        )
      )
      .then(() => 
        queryInterface.addColumn(
          'users',
          'itemPet',
          {
            type: Sequelize.INTEGER,
          }
        )
      )
      .then(() => 
        queryInterface.addColumn(
          'scripts',
          'hint',
          {
            type: Sequelize.TEXT,
          }
        )
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        'users', 
        'itemProtection' 
      )
      .then(() =>
        queryInterface.removeColumn(
          'users',
          'itemTime',
        )
      )
      .then(() => 
        queryInterface.removeColumn(
          'users',
          'itemAnswer',
       )
      )
      .then(() => 
        queryInterface.removeColumn(
          'users',
          'itemLife',
        )
      )
      .then(() => 
        queryInterface.removeColumn(
          'users',
          'itemAvatar',
        )
      )
      .then(() => 
        queryInterface.removeColumn(
          'users',
          'itemPet',
        )
      )
      .then(() => 
          queryInterface.removeColumn(
            'scripts',
            'hint'
          )
      )
  },
};