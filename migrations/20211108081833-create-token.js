'use strict';

const { INTEGER } = require("sequelize/types");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Tokens', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            token: {
                type: Sequelize.STRING,
                allowNullNuell: false
            },
            clientId: {
                type: Sequelize.INTEGER,
            },
            adminId: {
                type: Sequelize.INTEGER,
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Tokens');
    }
};