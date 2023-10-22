import SupportedOperations from "../SupportedOperations.js"
import * as ErrorCode from "../ErrorCodes.js"
import WorkItem from "../../../WorkItemEditor/WorkItemObject.js"
import * as FilenameGenerator from "../../FilenameGenerator.js"

import { E_CouldNotCreateFile, E_InvalidWorkItem, E_OperationNotSupportedForThisReportType, E_Success } from "../../ErrorCodes.js";

export class TextFileOperations{
    // Entry point for generating Text file reports
    GenerateReport(workItemList, operation){
        // first make sure we support whatever operation was passed to this method
        var operationIsSupportedFlag = false;
        for (var op in SupportedOperations){
            if (op = operation)
                operationIsSupportedFlag = true;
        }
        if(operationIsSupportedFlag = false)
            return new ErrorCode.ErrorCode(E_OperationNotSupportedForThisReportType, "Operation " + {operation} + " is not supported for .txt report type.");

        // validate work item list 
        for (var workItem in workItemList){
            if(typeof(workItem) != WorkItem){
                return new ErrorCode.ErrorCode(E_InvalidWorkItem, "Object in workItemList (" + {workItem} + ") is not a valid work item.");
            }
        }

        // Perform the actual generation of the report (including saving the .txt file on server)
        var result;
        switch(operation){
            case CalculateRemainingBalanceOfSelectedWorkItems:
                result = this.GenerateCalculateRemainingBalanceReport(workItemList)
                break;
            case GenerateWarehouseReceipt:
                result = this.GenerateWarehouseReceiptReport(workItemList);
                break;
        }

        if(typeof result === 'undefined'){ // in case we forget to return a success code from a report generator method (presumably, it didn't fail if it didn't return a bad code)
            return new ErrorCode.ErrorCode(E_Success, "Successfully generated report.")
        }
        else if(result.ErrorCode != E_Success){
            return result;
        }
        else return new ErrorCode.ErrorCode(E_Success, "Successfully generated report.");
    }




    /********************************************************************* 
     * 
     * 
     * Provide implementations for generating the text file reports below 
     * 
     * 
    **********************************************************************/

    GenerateCalculateRemainingBalanceReport(workItemList){
        // this is a string that we will build up over the course of this method, and will eventually get written out to a text file on the server
        // (that text file can then be uploaded to the client's system with Express, theoretically)
        var content = 'Remaining Balance Report';
        // loop through work items and add a line to the text file for each, with a "Remaining Balance: $$$" string at the end
        var totalBalance = 0.0;
        for (var workItem in workItemList){
            var workItemHeaderData;
            var workItemStatus;
            try{
                workItemHeaderData = workItem.workItemHeaderData;
                workItemStatus = workItem.workItemStatus;
            } catch (error){
                return new ErrorCode.ErrorCode(E_InvalidWorkItem, "Could not get required information from work item object: " + workItem);
            }

            content += "\r\n" + workItemHeaderData.jobName;
            content += " Remaining balance: " + workItemStatus.RemainingBalance;

            totalBalance += workItemStatus.RemainingBalance;
        }
        content += "\r\nTotal remaining balance of all work items: " + totalBalance + "\r\n";

        const fs = require('fs');
        // make sure directory exists
        let filename = FilenameGenerator.GenerateFilename("Remaining balance report ", ".txt");
        let directory = "/Reports";
        if(!fs.existsSync(directory)){
            fs.mkdirSync(directory);
        }

        let fullpath = directory + "/" + filename;
        fs.writeFile(fullpath, content, err => {
            if (err) {
                return new ErrorCode.ErrorCode(E_CouldNotCreateFile, "File " + fullpath + " was not able to be saved.");
            }
            // file written successfully
        });
    }

    GenerateWarehouseReceiptReport(workItemList){
        // TODO
    }
}



// Dictionary
SupportedOperations = {
    // Totals up all of the remaining balances in the work items
    // and outputs the information in a useful manner
    CalculateRemainingBalanceOfSelectedWorkItems : "Calculate Remaining Balance of Selected Work Items",

    // Generates a report that just has warehouse information for the materials
    // for a certain job, which the user will give to the warehouse manager,
    // so they know what materials they expect to be receiving in shipping
    GenerateWarehouseReceipt : "Generate Warehouse Receipt",

    // TODO add more supported operations here
}