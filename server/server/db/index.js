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
        pool.query(`select * from Inclusionary_Housing_Projects;`, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        })
    })
}
BASE_db.locationList = () => {
    return new Promise((resolve, reject) => {
        pool.query(`select A.ProjectName, C.Address, C.Latitude, C.Longitude, C.Borough from Inclusionary_Housing_Projects A 
                join Inclusionary_Housing_Transfers B  on A.ProjectID = B.GeneratingProjectID
                join Inclusionary_Housing_Properties C on B.TransferBuildingID = C.HPDBuildingID
                group by A.ProjectName, C.Address, C.Latitude, C.Longitude, C.Borough
                order by A.ProjectName;`, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        })
    })
}

module.exports = BASE_db;