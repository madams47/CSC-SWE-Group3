// Top Level data structure, contains all following classes as parameters. Represents the entire work item.
export class WorkItem{
    Info: WorkItemInfo;
    Address: Address;
    Contractor: Contractor;
    LaborItems: [Labor];
    Materials: [Material];
    Purchaser: Purchaser;

    constructor(Info: WorkItemInfo, Address: Address, Contractor: Contractor, LaborItems: [Labor], Materials: [Material], Purchaser: Purchaser){
        this.Info = Info;
        this.Address = Address;
        this.Contractor = Contractor;
        this.LaborItems = LaborItems;
        this.Materials = Materials;
        this.Purchaser = Purchaser;
    }
}


export class WorkItemInfo{
    Job_ID: number;
    Address_ID: number;
    Contractor_ID: number;
    Job_Name: string;
    Order_Date: Date;
    Install_Date: Date;
    Payment_Terms: string;
    Salesman: string;
    Total_Material: number;
    Total_Labor: number;
    Total: number;
    Complete: number;

    constructor(JobID: number, AddressID: number, ContractorID: number, JobName: string, OrderDate: Date,
        InstallDate: Date, PaymentTerms: string, salesman: string, TotalMaterial: number, TotalLabor: number,
        total: number, complete: number){
            this.Job_ID = JobID;
            this.Address_ID = AddressID;
            this.Contractor_ID = ContractorID;
            this.Job_Name = JobName;
            this.Order_Date = OrderDate;
            this.Install_Date = InstallDate;
            this.Payment_Terms = PaymentTerms;
            this.Salesman = salesman;
            this.Total_Material = TotalMaterial;
            this.Total_Labor = TotalLabor;
            this.Total = total;
            this.Complete = complete;

    }
}

export class Purchaser{
    Purchaser_ID: number;
    Address_ID: number;
    Job_ID: number;
    First_Name: string;
    Last_Name: string;
    Home_Phone: string;
    Work_Phone: string;

    constructor(PurchaserID: number, AddressId: number, JobId: number, FirstName: string,
         LastName: string, HomePhone: string, WorkPhone: string){
        this.Purchaser_ID = PurchaserID;
        this.Address_ID = AddressId;
        this.Job_ID = JobId;
        this.First_Name = FirstName;
        this.Last_Name = LastName;
        this.Home_Phone = HomePhone;
        this.Work_Phone = WorkPhone;
    }
}

export class Address{
    Address_ID: number;
    Street: string;
    City: string;
    State: string;
    ZIP: string;

    constructor(AddressId: number, street: string, city: string, state: string, zip: string){
        this.Address_ID = AddressId;
        this.Street = street;
        this.City = city;
        this.State = state;
        this.ZIP = zip;
    }
}

export class Contractor{
    Contractor_ID: number;
    Contractor_Name: string;
    Contractor_Phone: string;

    constructor(ContractorId: number, ContractorName: string, ContractorPhone: string){
        this.Contractor_ID = ContractorId;
        this.Contractor_Name = ContractorName;
        this.Contractor_Phone = ContractorPhone;
    }
}

export class JobLabor{
    Job_ID: number;
    Labor_ID: number;
    Quantity: number;

    constructor(JobID: number, LaborID: number, quantity: number){
        this.Job_ID = JobID;
        this.Labor_ID = LaborID;
        this.Quantity = quantity;
    }
}

export class Labor{
    Labor_ID: number;
    Labor_Type: string;
    Labor_Unit_Price: string; // this is a string in the database, but maybe it should be a number?

    constructor(LaborID: number, LaborType: string, LaborUnitPrice: string){
        this.Labor_ID = LaborID;
        this.Labor_Type = LaborType;
        this.Labor_Unit_Price = LaborUnitPrice;
    }
}

export class JobMaterial{
    Job_ID: number;
    Inventory_ID: number;
    Quantity: number;

    constructor(JobId: number, InventoryId: number, quantity: number){
        this.Job_ID = JobId;
        this.Inventory_ID = InventoryId;
        this.Quantity = quantity;
    }
}

export class Material{
    Inventory_ID: number;
    Material_Name: string;
    Size: string;
    Description: string;
    Inventory_Unit_Price: number;
    Location: string;

    constructor(InventoryId: number, MaterialName: string, size:string, 
        description: string, InventoryUnitPrice: number, location: string){
            
        this.Inventory_ID = InventoryId;
        this.Material_Name = MaterialName;
        this.Size = size;
        this.Description = description;
        this.Inventory_Unit_Price = InventoryUnitPrice;
        this.Location = location;
    }
}



