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
                type: Sequelize.DATEONLY,
                notNull: true //2021-10-2 13:30
            },
            endsAt: {
                type: Sequelize.DATEONLY,
                notNull: true //2021-10-2 15:30
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