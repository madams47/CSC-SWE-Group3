export function GenerateFilename(operation, extension){
    const today = new Date();
    const  yyyy = today.getFullYear();
    let MM = today.getMonth() + 1; // Months start at 0
    let dd = today.getDate();
    let hh = today.getHours();
    let mm = today.getMinutes();
    let ss = today.getSeconds();

    if (dd < 10) dd = '0' + dd;
    if (MM < 10) MM = '0' + MM;
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;

    const formattedDate = MM + '-' + dd + '-' + yyyy + '~' + hh + mm + ss;
    if(extension[0] != '.'){
        extension = "." + extension;
    }
    return operation + " " + formattedDate + extension;
}