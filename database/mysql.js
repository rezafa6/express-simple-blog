const mysql2 = require('mysql2');
const {ENV} = require('@env/env');

const connectionToDB = mysql2.createConnection({
    host: ENV.database.host,
    user: ENV.database.user,
    database: ENV.database.databaseName,
    password: ENV.database.password,
  });

module.exports = connectionToDB.promise();