'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointmentsModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  appointmentsModel.init({
    dateNumber: DataTypes.INTEGER,
    schedule: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'appointmentsModel',
  });
  return appointmentsModel;
};