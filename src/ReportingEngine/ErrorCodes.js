export let E_Success = 0;
export let E_Unknown = 1;
export let E_InvalidParameter = 2;
export let E_CouldNotConnectToDatabase = 3;
export let E_CouldNotCreateFile = 4;
export let E_FileAlreadyExists = 5;
export let E_OperationNotSupportedForThisReportType = 6;
export let E_InvalidWorkItem = 7;

export class ErrorCode{
    constructor(errorCode, message){
        this.ErrorCode = errorCode;
        this.Message = message;
    }

}

