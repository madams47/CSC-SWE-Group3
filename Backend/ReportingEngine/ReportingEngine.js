import * as WorkItem from "../../frontend/src/WorkItemObject.js"
import * as ErrorCode from "./ErrorCodes.js"
import * as TextFile from "./Operations/TextFileOperations/TextFileOperations.js"

// Input: 
// WorkItemList - array of WorkItem objects
// operation - see SupportedOperations.js for available operations
// exportType - 
export function GenerateReports(WorkItemList, operation, exportType){
    console.log("Enter GenerateReports")

    if(WorkItemList.length == 0)
        return new ErrorCode.ErrorCode(ErrorCode.E_WorkItemListEmpty, "Work item list is empty!");

    // // note that we currently are placing no restrictions on the amount of work items that can be sent (as long as it's more than 1)
    // // There are currently no plans to do so. 

    // for(let i = 0; i < WorkItemList.length; i++){
    //     let workItem = WorkItemList[i];
    //     console.log(typeof(workItem))
    //     if(!(workItem instanceof WorkItem.WorkItem)){
    //         return new ErrorCode.ErrorCode(ErrorCode.E_InvalidWorkItem, "Work item " + workItem + " could not be cast to WorkItem type.", JSON.stringify(workItem));
    //     }
    // }

    if(!SupportedFileTypes.includes(exportType)){
        return new ErrorCode.ErrorCode(ErrorCode.E_InvalidParameter, "Export type '" + JSON.stringify(exportType) + "' is not included in SupportedFileTypes");
    }

    return TextFile.GenerateReport(WorkItemList, operation);
};

export const SupportedFileTypes = [
    TextFile,
    // CDFFile, // comma-delimited value format. Not yet supported
]