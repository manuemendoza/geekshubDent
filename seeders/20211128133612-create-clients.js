'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let date = new Date();
        const salt = bcrypt.genSaltSync(7);
        const hash = bcrypt.hashSync('user', salt);
        let clients = [
        
            {
                name: "user",
                surName:"user", 
                email:"user@user.com", 
                phoneNumber:"123456",
                password: hash,
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
