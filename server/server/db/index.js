const mysql = require('mysql');
const { mysql_host, mysql_port, mysql_db, mysql_user, mysql_pass } = require('../../config');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: mysql_host,
    port: mysql_port,
    database: mysql_db,
    user: mysql_user,
    password: mysql_pass
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