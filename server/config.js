// config.js
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
console.log(`hallo henniii ${process.env.NODE_ENV}`);
module.exports = {
  mysql_host:process.env.MYSQL_HOST,
  mysql_port:process.env.MYSQL_PORT,
  mysql_db:process.env.MYSQL_DB,
  mysql_user:process.env.MYSQL_USER,
  mysql_pass: process.env.MYSQL_PASSWORD
};