const Sequelize = require("sequelize");

const sequelize = new Sequelize("cheqmateDB", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
});

module.exports = sequelize;
