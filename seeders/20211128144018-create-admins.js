'use strict';
const bcrypt = require('bcryptjs');

module.exports = {

    up: async (queryInterface, Sequelize) => {
        let date = new Date();
        const salt = bcrypt.genSaltSync(7);
        const hash = bcrypt.hashSync('admin', salt);
        let admins = [
            {
                name: "admin",
                surName:"admin", 
                email:"admin@admin.com", 
                phoneNumber:"123456",
                password: hash,
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
