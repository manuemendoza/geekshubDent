'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Appointments', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            startsAt: {
                type: Sequelize.DATE
            },
            endsAt: {
                type: Sequelize.DATE
            },
            createdAt: {
                notNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                notNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Appointments');
    }
};