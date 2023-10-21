const express = require('express');
const database = require('./src/database');
const app = express();
const hostname = '34.207.59.25'; // IP address of the AWS EC2 server. Use when pushing to main (by pull request)
//const hostname = 'localhost'; // use when debugging
const port = 3000;

const version = '1.0.0.2'
const groupName = 'CSC-SWE-Group3';

// home page
app.get('/', (req, res) => {
  res.sendFile('src/html/index.html', {root: __dirname })
 
  console.log(`[Version ${version}]: New request => http://${hostname}:${port}`+req.url);

})

app.get('/error', (req, res) => {
    res.sendFile('src/html/Error.html', {root: __dirname })

}) 

app.get('/showTables', async function(req, res){
    var tables = await database.getTables();
    console.log(tables);
    res.send(tables);
})

app.get('/showMaterials', async function(req, res){
    var materials = await database.getMaterials();
    console.log(materials);
    res.send(materials);
})

app.listen(port, () => {
    console.log(`[Version ${version}]: Server running at http://${hostname}:${port}/`);
})
