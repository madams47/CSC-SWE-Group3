import * as WorkItem from "./src/WorkItemEditor/WorkItemObject.js"
import * as ReportingEngine from "./src/ReportingEngine/ReportingEngine.js"
import * as TextFileOperations from "./src/ReportingEngine/Operations/TextFileOperations.js"

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

app.get('/generateReport', (req, res) => {
    var engine = new ReportingEngine()
    var result = engine.GenerateReports({demoWorkItem}, TextFileOperations.SupportedOperations[0], engine.SupportedFileTypes);
    console.log(result);
    res.send(result)
})

app.listen(port, () => {
    console.log(`[Version ${version}]: Server running at http://${hostname}:${port}/`);
})

const demoWorkItem = new WorkItem.WorkItem("100000",
    new WorkItem.WorkItemHeaderData("Joe Schmoe", "443-123-4567", "410-987-6543", "jschmoe@organization.com", "Mistake, MD", "Mistake High School Renovations 2023", "01/15/2023"),
    new WorkItem.WorkItemStatus(false, 100000.0, null), 
    null, 
    new WorkItem.Product(1234, "4in vinyl covebase BLK", "Johnsonite", 3.75, 600));