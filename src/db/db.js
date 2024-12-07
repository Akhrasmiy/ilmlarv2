const knex = require("knex");
const knexConfig = require("./knexFile");

const db = knex(knexConfig[process.env.NODE_ENV || "development"]);

module.exports = db;
