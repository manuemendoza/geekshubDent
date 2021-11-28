'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let date = new Date();
        let clients = [
        
            {
                name: "user",
                surName:"user", 
                email:"user@user.com", 
                phoneNumber:"123456",
                password: "user",
                role: "user",
                createdAt: date,
                updatedAt : date
            }
        ];
        await queryInterface.bulkInsert('clients', clients, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('client', null, {});
    }
};
