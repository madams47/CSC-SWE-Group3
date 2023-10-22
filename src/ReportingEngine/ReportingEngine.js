import WorkItem from "../WorkItemEditor/WorkItemObject.js"
import * as ErrorCode from "./ErrorCodes.js"
import * as TextFile from "./Operations/TextFileOperations.js"

// TODO
// Need to actually test this with real work item data
// I am not entirely sure that we are able to access the work item data
// from down in the Operations/TextFileOperations.js class, and won't be 
// able to know until we test it.
//
// To this end, I am also not sure if the TextFileOperations class is able
// to actually write out a file to the server yet, because the code is untested 
// (although the code exists to do it, I just refuse to assume it works in it's current state).
//
// Ultimately, once this ReportingEngine starts working, we should end up with 
// .txt files stored on the server's file system. I believe that by using Express,
// we can upload the file to the client's computer to finish the "Generate report transaction"
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

    SupportedFileTypes = {
        TextFile,
        // CDFFile, // comma-delimited value format. Not yet supported
    }
}