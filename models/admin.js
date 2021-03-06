'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Admin.hasMany(models.Token, {
                onDelete: 'cascade'
            })
        }
    };
    Admin.init({
        name: DataTypes.STRING,
        surName: DataTypes.STRING,
        email: DataTypes.STRING,
        phoneNumber: DataTypes.INTEGER,
        password: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Admin',
    });
    return Admin;
};