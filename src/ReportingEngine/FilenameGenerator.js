export class FilenameGenerator{
    GenerateFilename(operation, extension){
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedDate = dd + '-' + mm + '-' + yyyy;
        if(extension[0] != '.'){
            extension = "." + extension;
        }
        return operation + " " + formattedDate + extension;
    }
}