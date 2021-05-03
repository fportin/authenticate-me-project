'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SpotLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      coordinates: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.DECIMAL)
      },
      spotId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'VacationSpots' },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SpotLocations');
  }
};