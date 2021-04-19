'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Times', 'registeredTime');
    await queryInterface.addColumn('Times', 'milliseconds', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('Times', 'seconds', {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Times', 'registeredTime', {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.removeColumn('Times', 'milliseconds');
    await queryInterface.removeColumn('Times', 'seconds');
  },
};
