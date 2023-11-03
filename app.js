// const WorkItem = require('./src/WorkItemEditor/WorkItemObject.js')
// const ReportingEngine = require('./src/ReportingEngine/ReportingEngine.js')
// const TextFileOperations = require('./src/ReportingEngine/Operations/TextFileOperations/TextFileOperations.js')
// const express = require('express');
// const database = require('./src/database');

import * as WorkItem from './src/WorkItemEditor/WorkItemObject.js';
import * as ReportingEngine from './src/ReportingEngine/ReportingEngine.js';
import * as TextFileSupportedOperations from './src/ReportingEngine/Operations/TextFileOperations/SupportedOperations.js';
import * as database from './src/database.js';
import express from 'express';
import { ErrorCode } from './src/ReportingEngine/ErrorCodes.js';

const app = express();
//const hostname = '34.207.59.25'; // IP address of the AWS EC2 server. Use when pushing to main (by pull request)
const hostname = 'localhost'; // use when debugging
const port = 3000;

const version = '1.0.0.2'
const groupName = 'CSC-SWE-Group3';

const demoWorkItem = new WorkItem.WorkItem("100000",
    new WorkItem.WorkItemHeaderData("Joe Schmoe", "443-123-4567", "410-987-6543", "jschmoe@organization.com", "Accident, MD", "Accident High School Renovations 2023", "01/15/2023"),
    new WorkItem.WorkItemStatus(false, 100000.0, null), 
    null, 
    new WorkItem.Product(1234, "4in vinyl covebase BLK", "Johnsonite", 3.75, 600));

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
    const workItemList = [];
    workItemList.push(demoWorkItem);
    workItemList.push(demoWorkItem);
    

    var result = ReportingEngine.GenerateReports(workItemList, TextFileSupportedOperations.SupportedOperations.CalculateRemainingBalanceOfSelectedWorkItems, ReportingEngine.SupportedFileTypes[0]);
    console.log("Result type:  " + typeof(result) + " \tResult: " + result);
    if(typeof(result) == "string"){
        console.log("Downloading file")
        res.download(result)
    } else {
        console.log("Sending result")
        res.send(result)
    }
})

app.listen(port, () => {
    console.log(`[Version ${version}]: Server running at http://${hostname}:${port}/`);
})

