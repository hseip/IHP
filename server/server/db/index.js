const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '192.168.1.130',
    port: '3306',
    user: 'BASE',
    password: 'base',
    database: 'BASE_ihp'
});

let BASE_db = {};

BASE_db.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('select * from Inclusionary_Housing_Projects;', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        })
    })
}

module.exports = BASE_db;