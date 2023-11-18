// Top Level data structure, contains all following classes as parameters. Represents the entire work item.
export class WorkItem{
    constructor(ID, WorkItemHeaderData, WorkItemStatus, CustomerPayments, Products) {
        this.ID = ID;
        this.WorkItemHeaderData = WorkItemHeaderData;
        this.WorkItemStatus = WorkItemStatus
        this.CustomerPayments = CustomerPayments;
        this.Products = Products; // list of Product objects
    }
}

// Represents the data relevant only to the header of the 
export class WorkItemHeaderData{
    constructor(customerName, customerPhone, secondaryPhone, customerEmail, jobLocation, jobName, contractDate){
        this.customName = customerName;
        this.customerPhone = customerPhone;
        this.secondaryPhone = secondaryPhone;
        this.customerEmail = customerEmail;
        this.jobLocation = jobLocation;
        this.jobName = jobName;
        this.contractDate = contractDate;
    }
}

export class WorkItemStatus{
    constructor(completed, remainingBalance, customerPayments){
        this.completed = completed;
        this.remainingBalance = remainingBalance;
        this.customerPayments = customerPayments;
    }
}

class CustomerPayments{
    // contains an array of payments, and other payment information
    // TODO
}

export class Product{
    constructor(inventoryNumber, productName, manufacturer, unitPrice, quantity){
        this.inventoryNumber = inventoryNumber;
        this.productName = productName;
        this.manufacturer = manufacturer;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

    getTotalCost(){
        return this.unitPrice * quantity.parse;
    }
}

export class Quantity{
    constructor(quantityString, quantityUnit){
        this.quantityString = quantityString;
        this.quantityUnit = quantityUnit;
    }


    parseQuantityString(){
        // TODO
        // use regex to match different patterns of size format
        // once we know the size format, can determine from it
        // the quantity (which is a decimal number)
    }
}

export const E_QuantityUnit = {
    linearFeet: "ft.",
    feetSquared: "ft.2",
    inches: "in.",
    inchesSquared: "in.2",
    rolls: "Rolls",
    packages: "Packages",
    boxes: "Boxes",
    pallets: "Pallets",
    buckets: "Buckets",
    gallons: "Gallons",
    quarts: "Quarts",
    pcs: "Pcs.",
    pieces: "Pieces",
    cartons: "Cartons",
    count: "Count",
    cnt: "Cnt.",
    ct: "Ct.",
    other: "Other"
}

class Labor{
    
}