import * as TextFileSupportedOperations from "./SupportedOperations.js"
import * as ErrorCode from "../../ErrorCodes.js"
import * as WorkItem from "../../../WorkItemEditor/WorkItemObject.js"
import * as FilenameGenerator from "../../FilenameGenerator.js"

const PathToReports = "/Reports"

// Input:
//  workItemList: array of work items to generate reports for
//               besides validating that the elements in the workItemList are WorkItem objects, and that the list
//               contains more than one element, we are not doing any other validation. The specific method to generate
//               the report should output in the report if multiple items are supposed to be selected
// Return:
//  If success, returns path to report file that we just created
//  If failure, returns ErrorCode object 
export function GenerateReport(workItemList, operation){
    console.log("Enter Generate report. Params: {" + JSON.stringify(workItemList) + ", " + JSON.stringify(operation) + "}");
    // first make sure we support whatever operation was passed to this method
    // NOTE We are currently accepting any operation, as long as it exists in SupportedOperations.js
    // If we support other file types, we should have a subset of SupportedOperations defined for each file type (txt files, cdf files, pdf, etc.)
    // Such that (for example) TextFileSupportedOperations, CDFFileSupportedOperations, etc. are all subsets of SupportedOperations
    var operationIsSupportedFlag = false;
    for (var op in TextFileSupportedOperations.SupportedOperations){
        console.log(op)
        if (op == operation)
            operationIsSupportedFlag = true;
    }
    if(operationIsSupportedFlag = false)
        return new ErrorCode.ErrorCode(ErrorCode.E_OperationNotSupportedForThisReportType, "Operation " + {operation} + " is not supported for .txt report type.", operation);
    console.log("Operation " + operation + " supported! Validating work item list...")

    // validate work item list 
    for (let i = 0; i < workItemList.length; i++){
        let workItem = workItemList[i]
        if(!(workItem instanceof WorkItem.WorkItem)){
            return new ErrorCode.ErrorCode(ErrorCode.E_InvalidWorkItem, "Object in workItemList (" + {workItem} + ") is not a valid work item.", workItem);
        }
    }
    
    console.log("Work item list valid!");

    // Perform the actual generation of the report (including saving the .txt file on server)
    console.log("Generate report: Calling method to generate file");
    var result;
    switch(operation){
        case TextFileSupportedOperations.SupportedOperations.CalculateRemainingBalanceOfSelectedWorkItems:
            result = GenerateCalculateRemainingBalanceReport(workItemList)
            break;
        case TextFileSupportedOperations.SupportedOperations.GenerateWarehouseReceipt:
            result = GenerateWarehouseReceiptReport(workItemList);
            break;
        default:

        return new ErrorCode.ErrorCode(ErrorCode.E_Success, "Successfully generated report.", null)
            break;
    }

    if(typeof result === 'undefined'){ // in case we forget to return a code from a report generator method 
        return new ErrorCode.ErrorCode(ErrorCode.E_Unknown, "Programmer error. No return value from report generator method.", null)
    }
   
    // If Success: result = path to the file on the server's local filesystem
    // If Error: result is an ErrorCode
    return result;
}




/********************************************************************* 
 * 
 * 
 * Provide implementations for generating the text file reports below 
 * 
 * 
 * All methods should return either the filename of the generated report
 * or an ErrorCode
 * 
 * 
**********************************************************************/

/*
//Template

function ReportName(workItemList){
    var content = 'Header of report\r\n'

    // append strings to content to form report
    content += "Report content"

    return CreateTextFile("Name of report", content)
}
*/

import fs from 'fs'

function GenerateCalculateRemainingBalanceReport(workItemList){
    console.log("Enter GenerateCalculateRemainingBalanceReport")
    // this is a string that we will build up over the course of this method, and will eventually get written out to a text file on the server
    // (that text file can then be uploaded to the client's system with Express, theoretically)
    var content = 'Remaining Balance Report';
    // loop through work items and add a line to the text file for each, with a "Remaining Balance: $$$" string at the end
    var totalBalance = 0.0;
    for (let i = 0; i < workItemList.length; i++){
        let workItem = workItemList[i]
        var workItemHeaderData;
        var workItemStatus;
        try{
            workItemHeaderData = workItem.WorkItemHeaderData;
            workItemStatus = workItem.WorkItemStatus;
        } catch (error){
            return new ErrorCode.ErrorCode(ErrorCode.E_InvalidWorkItem, "Could not get required information from work item object: " + workItem, null);
        }

        content += "\r\n" + workItemHeaderData.jobName;
        content += " Remaining balance: " + workItemStatus.remainingBalance;

        totalBalance += workItemStatus.remainingBalance;
    }
    content += "\r\nTotal remaining balance of all work items: " + totalBalance + "\r\n";

    console.log("Report text generated. Text: " + content);
    return CreateTextFile("Remaining balance report ", content);
}



function GenerateWarehouseReceiptReport(workItemList){
    console.log("Enter GenerateWarehouseReceiptReport()")

    var content = "Warehouse Receipt";
    // Headers
    content += "\r\nReceived |   Date   |   Item Information\r\n";
    for(let i = 0; i < workItemList.length; i++){
        let workItem = workItemList[i];
        var workItemMaterialInformation;
        try{
            workItemMaterialInformation = workItem.Products;

            console.log("Mat info: " + workItemMaterialInformation)
        } catch (error){
            return new ErrorCode.ErrorCode(ErrorCode.E_InvalidWorkItem, "Could not get required information from work item object: " + workItem, null);
        }

            //constructor(inventoryNumber, productName, manufacturer, unitPrice, quantity){
        content += "         |          | " + workItemMaterialInformation.inventoryNumber + "\t| " + workItemMaterialInformation.productName + "\t| " + workItemMaterialInformation.manufacturer + "\r\n"; 
    }

    console.log("Report text generated. Text: " + content);
    return CreateTextFile("Warehouse Receipt", content);
}

function CreateTextFile(reportName, content){
    console.log("Enter CreateTextFile()");

    // make sure directory exists
    let filename = FilenameGenerator.GenerateFilename(reportName, ".txt");
    let directory = PathToReports;
    if(!fs.existsSync(directory)){
        console.log("Making directory " + directory);
        fs.mkdirSync(directory);
    }

    let fullpath = directory + "/" + filename;
    console.log("Creating file at " + fullpath)
    fs.writeFileSync(fullpath, content, err => {
        if (err) {
            return new ErrorCode.ErrorCode(E_CouldNotCreateFile, "File " + fullpath + " was not able to be saved.", null);
        }
        // file written successfully
        console.log("File created successfully");
    })

    return fullpath;
}