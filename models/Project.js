const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Project extends Model {}

Project.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  },
  {
    sequelize
  }
);

module.exports = Project;
