'use strict';

module.exports = {

    up: async (queryInterface, Sequelize) => {
        let date = new Date();
        let admins = [
            {
                name: "admin",
                surName:"admin", 
                email:"admin@admin.com", 
                phoneNumber:"123456",
                password: "admin",
                role: "admin",
                createdAt: date,
                updatedAt : date
            }
        ];
        await queryInterface.bulkInsert('admins', admins, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('admins', null, {});
    }
};
