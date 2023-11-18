//export let E_Success = 0; // note that we don't return a successful result. In case of success, ReportGenerator returns the full path of the report file
export let E_Unknown = 1;
export let E_InvalidParameter = 2;
export let E_CouldNotConnectToDatabase = 3;
export let E_CouldNotCreateFile = 4;
export let E_FileAlreadyExists = 5;
export let E_OperationNotSupportedForThisReportType = 6;
export let E_InvalidWorkItem = 7;
export let E_WorkItemListEmpty = 8;

export class ErrorCode{
    constructor(errorCode, message, object){
        this.ErrorCode = errorCode;
        this.Message = message;
        this.Object = object;
    }

}

