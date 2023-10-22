import WorkItem from "../WorkItemEditor/WorkItemObject.js"
import * as ErrorCode from "./ErrorCodes.js"
import * as TextFile from "./Operations/TextFileOperations.js"

export class ReportingEngine{
    GenerateReports(WorkItemList, operation, exportType){
        for(var workItem in WorkItemList){
            if(typeof(workItem) !== WorkItem)
                return new ErrorCode.ErrorCode(ErrorCode.E_InvalidWorkItem, "Work item " + workItem + " could not be cast to WorkItem type.");
        }

        if(typeof(exportType) != this.E_SupportedFileTypes){
            return E_InvalidParameter;
        }

        TextFile.GenerateReport(WorkItemList, operation);
    };

    E_SupportedFileTypes = {
        TextFile,
        // CDFFile, // comma-delimited value format. Not yet supported
    }
}