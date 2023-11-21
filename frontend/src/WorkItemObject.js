"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = exports.JobMaterial = exports.Labor = exports.JobLabor = exports.Contractor = exports.Address = exports.Purchaser = exports.WorkItemInfo = exports.WorkItem = void 0;
// Top Level data structure, contains all following classes as parameters. Represents the entire work item.
var WorkItem = /** @class */ (function () {
    function WorkItem(Info, Address, Contractor, LaborItems, Materials, Purchaser) {
        this.Info = Info;
        this.Address = Address;
        this.Contractor = Contractor;
        this.LaborItems = LaborItems;
        this.Materials = Materials;
        this.Purchaser = Purchaser;
    }
    return WorkItem;
}());
exports.WorkItem = WorkItem;
var WorkItemInfo = /** @class */ (function () {
    function WorkItemInfo(JobID, AddressID, ContractorID, JobName, OrderDate, InstallDate, PaymentTerms, salesman, TotalMaterial, TotalLabor, total, complete) {
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
    return WorkItemInfo;
}());
exports.WorkItemInfo = WorkItemInfo;
var Purchaser = /** @class */ (function () {
    function Purchaser(PurchaserID, AddressId, JobId, FirstName, LastName, HomePhone, WorkPhone) {
        this.Purchaser_ID = PurchaserID;
        this.Address_ID = AddressId;
        this.Job_ID = JobId;
        this.First_Name = FirstName;
        this.Last_Name = LastName;
        this.Home_Phone = HomePhone;
        this.Work_Phone = WorkPhone;
    }
    return Purchaser;
}());
exports.Purchaser = Purchaser;
var Address = /** @class */ (function () {
    function Address(AddressId, street, city, state, zip) {
        this.Address_ID = AddressId;
        this.Street = street;
        this.City = city;
        this.State = state;
        this.ZIP = zip;
    }
    return Address;
}());
exports.Address = Address;
var Contractor = /** @class */ (function () {
    function Contractor(ContractorId, ContractorName, ContractorPhone) {
        this.Contractor_ID = ContractorId;
        this.Contractor_Name = ContractorName;
        this.Contractor_Phone = ContractorPhone;
    }
    return Contractor;
}());
exports.Contractor = Contractor;
var JobLabor = /** @class */ (function () {
    function JobLabor(JobID, LaborID, quantity) {
        this.Job_ID = JobID;
        this.Labor_ID = LaborID;
        this.Quantity = quantity;
    }
    return JobLabor;
}());
exports.JobLabor = JobLabor;
var Labor = /** @class */ (function () {
    function Labor(LaborID, LaborType, LaborUnitPrice) {
        this.Labor_ID = LaborID;
        this.Labor_Type = LaborType;
        this.Labor_Unit_Price = LaborUnitPrice;
    }
    return Labor;
}());
exports.Labor = Labor;
var JobMaterial = /** @class */ (function () {
    function JobMaterial(JobId, InventoryId, quantity) {
        this.Job_ID = JobId;
        this.Inventory_ID = InventoryId;
        this.Quantity = quantity;
    }
    return JobMaterial;
}());
exports.JobMaterial = JobMaterial;
var Material = /** @class */ (function () {
    function Material(InventoryId, MaterialName, size, description, InventoryUnitPrice, location) {
        this.Inventory_ID = InventoryId;
        this.Material_Name = MaterialName;
        this.Size = size;
        this.Description = description;
        this.Inventory_Unit_Price = InventoryUnitPrice;
        this.Location = location;
    }
    return Material;
}());
exports.Material = Material;
