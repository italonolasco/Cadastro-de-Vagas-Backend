'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('candidacies', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      candidate_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'candidates', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      vacancy_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'vacancies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('candidacies');
  }
};