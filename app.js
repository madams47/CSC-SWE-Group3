const express = require('express');
const database = require('./src/database');
const app = express();
const hostname = 'localhost'; //'18.205.236.145'; // IP address of the AWS EC2 server
const port = 8000;

const version = '1.0.0.0'
const groupName = 'CSC-SWE-Group3';

// home page
app.get('/', (req, res) => {
  res.sendFile('src/html/index.html', {root: __dirname })
 
  console.log(`[Version ${version}]: New request => http://${hostname}:${port}`+req.url);

})

app.get('/error', (req, res) => {
    res.sendFile('src/html/Error.html', {root: __dirname })

}) 

app.get('/showTables', (req, res) => {
    var tables = database.getTables();
    console.log(tables);
    res.send(tables);
})

app.listen(port, () => {
    console.log(`[Version ${version}]: Server running at http://${hostname}:${port}/`);
})
