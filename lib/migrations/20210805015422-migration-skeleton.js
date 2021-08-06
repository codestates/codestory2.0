'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .changeColumn(
        'users',
        'itemAvatar', 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'items',
            key: 'id'
          }
        }
      )
      .then(() => 
        queryInterface.changeColumn(
          'users',
          'itemPet',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'items',
              key: 'id'
            }
          }
        )
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .changeColumn(
        'users',
        'itemAvatar', 
        {
          type: Sequelize.INTEGER,
        }  
      )
      .then(() => 
        queryInterface.changeColumn(
          'users',
          'itemPet',
          {
            type: Sequelize.INTEGER,
          }
        )
      );
  }
};
