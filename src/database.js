const mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'database-1.c24gbqidt5ob.us-east-2.rds.amazonaws.com',    
    port: "3306",
    user: 'admin',
    password: 'on1y3FCl&$$',
    database: 'mydb'
})

exports.getTables = async function () {
    var sql = "SHOW tables";
    return makeQuery(sql);
};

exports.getMaterials = async function () {
    var sql = "SELECT * FROM Material";
    return makeQuery(sql);
};

function makeQuery(sqlCommand){
    return new Promise((resolve, reject) => {
        connection.query(sqlCommand, (err, tables) => {
            if(err)
                reject(err);
            else
                resolve(tables);
        });
    });
};