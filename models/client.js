'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClientModel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    ClientModel.init({
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        phoneNumber: DataTypes.INTEGER,
        password: DataTypes.STRING,
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ClientModel',
    });
    // return ClientModel;
