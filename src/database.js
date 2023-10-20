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
    var ret;
    await connection.query(sql, (err, tables) => {
        console.log(tables);
    })
};

