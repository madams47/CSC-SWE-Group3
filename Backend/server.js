import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import * as ReportingEngine from './ReportingEngine/ReportingEngine.js';
import * as TextFileSupportedOperations from './ReportingEngine/Operations/TextFileOperations/SupportedOperations.js';
import React from 'react'
import { useLocation } from 'react-router-dom';
const app = express(); 

app.use(express.json());
app.use(cors(
    {
        "origin": 'http://localhost:3000',
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 200,
        "credentials": true
      }));

var allowCrossDomain = function(req,res,next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();  
}
app.use(allowCrossDomain);

const db = mysql.createConnection({
    host: 'database-1.c24gbqidt5ob.us-east-2.rds.amazonaws.com',
    port: "3306",
    user: 'admin',
    password: 'on1y3FCl&$$',
    database: 'mydb'
})

app.get("/GetAddress", (request, response) => {
    const sql = "SELECT * FROM address";
    db.query(sql, (error, data) => {
        if(error) return app.json ("Error");
        return response.json(data);
    })
} )

app.get("/seelogin", (request, response) => {
    const sql = "SELECT * FROM login";
    db.query(sql, (error, data) => {
        if(error) return app.json ("Error");
        return response.json(data);
    })
} )



app.get("/Contractor", (request, response) => {
    const sql = "SELECT * FROM contractor";
    db.query(sql, (error, data) => {
        if(error) return app.json ("Error");
        return response.json(data);
    })
} )

app.post("/CreateAddress", (request, response) => {
    const Address_ID = request.body.Address_ID;
    const Street = request.body.Street;
    const City = request.body.City;
    const State = request.body.State;
    const ZIP = request.body.ZIP;

    db.query("INSERT INTO address (Address_ID, Street, City, State, ZIP) VALUES (?,?,?,?,?)", 
                                          [Address_ID, Street, City, State, ZIP], (error, data) =>{
        if(error) return response.json("Error")
        else return response.send("Values Inserted");
    })
})


app.post("/CreateWorkItem", (request, response) => {
    const Address_ID = request.body.Address_ID;
    const Contractor_ID = request.body.Contractor_ID;
    const Job_Name = request.body.Job_Name;
    const Order_Date = request.body.Order_Date;
    const install_Date = request.body.install_Date;
    const Payment_Terms = request.body.Payment_Terms;
    const Salesman = request.body.Salesman;
    const Total_Material = request.body.Total_Material;
    const Total_Labor = request.body.Total_Labor;
    const Total = request.body.Total;
    const Complete = request.body.Complete;

    const sql = `
        INSERT INTO job
        (Address_ID, Contractor_ID, Job_Name, Order_Date, install_Date, Payment_Terms, Salesman,
        Total_Material, Total_Labor, Total, Complete)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [Address_ID, Contractor_ID, Job_Name, Order_Date, install_Date, Payment_Terms, Salesman,
        Total_Material, Total_Labor, Total, Complete], (error, data) => {
            if (error) {
                return response.json("Error: " + error.message);
            } else {
                return response.send("Values Inserted");
            }
        });
});

// Retrieves the auto-incremented ID generated for the last (most recently added) work item
app.get("/GetLastInsertedId", (request, response) =>{
    const sql = `SELECT LAST_INSERT_ID() as ID`
    db.query(sql, (error, data) => {
        if(error) return app.json ("Error");
        return response.json(data[0].ID);
    })
})

app.post("/CreateJobMaterial", (request, response) => {
    const Job_ID = request.body.jobId;
    const Inventory_ID = request.body.inventoryId;
    const Quantity = request.body.quantity;
    const sql = `
        INSERT INTO job_material
        (Job_ID, Inventory_ID, Quantity)
        VALUES (?, ?, ?)`

    db.query(sql, [Job_ID, Inventory_ID, Quantity], (error, data) => {
        if (error) {
            return response.json("Error: " + error.message)
        } else {
            return response.send("Values Inserted")
        }
    })
})

app.post("/CreateMaterial", (request, response) => {
    const Inventory_ID = request.body.materialId; // hope this is auto incremementd
    const Material_Name = request.body.Material_Name;
    const Size = request.body.Size;
    const Description = request.body.Description;
    const Inventory_Unit_Price = request.body.Inventory_Unit_Price;
    const Location = request.body.Location;

    const sql = `
        INSERT INTO material
        (Inventory_ID, Material_Name, Size, Description, Inventory_Unit_Price, Location)
        VALUES (?, ?, ?, ?, ?, ?)`

    db.query(sql, [Inventory_ID, Material_Name, Size, Description, Inventory_Unit_Price, Location], (error, data) => {
        if (error) {
            return response.json("Error: " + error.message)
        } else {
            return response.send("Values Inserted")
        }
    })
})

app.get("/GetMaterials", (request, response) => {
    const sql = "SELECT * FROM material";
    db.query(sql, (error, data) => {
        if(error) return app.json ("Error");
        return response.json(data);
    })
} )

app.get("/GetMaxMaterialId", (request, response) => {
    const sql = "SELECT MAX(Inventory_ID) as maxId FROM material";
    db.query(sql, (error, data) => {
        if(error) return app.json ("Error");
        return response.json(data[0].maxId);
    })
} )

app.post("/CreateUser", (request, response) => {
    const User_Name = request.body.userUser_Name;
    const Pass = request.body.userPass;
   

    const sql = `
        INSERT INTO login
        (User_Name, Pass)
        VALUES (?, ?)`;

    db.query(sql, [User_Name, Pass], (error, data) => {
            if (error) {
                return response.json("Error: " + error.message);
            } else {
                return response.send("Values Inserted");
            }
        });
});


app.post("/deleteUser/:User_Name", (request, response) => {
    const User_Name = request.params.User_Name;

    const sql = `
        DELETE FROM login
        WHERE User_Name = ?
    `;

    db.query(sql, [User_Name], (error, result) => {
        if (error) {
            return response.status(500).json({ error: 'Error deleting user' });
        }

        if (result.affectedRows === 0) {
            return response.status(404).json({ error: 'user not found' });
        }

        return response.status(200).json({ message: 'user deleted successfully' });
    });
});

app.put("/updateUser/:User_Name", (request, response) => {
    const User_Name = request.params.User_Name;
    const Pass = request.body.Pass;
    const NewUser_Name = request.body.NewUser_Name; // Assuming you want to update User_Name

    console.log("Received PUT request for User_Name:", User_Name);
    console.log("Request body:", request.body);

    const sql = `
        UPDATE login
        SET
        User_Name = COALESCE(?, User_Name),
        Pass = COALESCE(?, Pass)
        WHERE User_Name = ?`;

    console.log("SQL query:", sql);
    
    db.query(sql, [NewUser_Name, Pass, User_Name], (error, data) => {
        if (error) {
            console.error("Database error:", error);
            return response.status(500).json({ error: "Database error" });
        }

        console.log("Update successful. Rows affected:", data.affectedRows);
        return response.status(200).json({ message: "Values Updated" });
    });
});



app.post("/deleteWorkItem/:Job_ID", (request, response) => {
    const Job_ID = request.params.Job_ID;

    const sql = `
        DELETE FROM job
        WHERE Job_ID = ?
    `;

    db.query(sql, [Job_ID], (error, result) => {
        if (error) {
            return response.status(500).json({ error: 'Error deleting work item' });
        }

        if (result.affectedRows === 0) {
            return response.status(404).json({ error: 'Work item not found' });
        }

        return response.status(200).json({ message: 'Work item deleted successfully' });
    });
});

app.post("/generateReport/", (request, res) =>{
    console.log("Enter Generate Report:")
    const workItemList = request.body.WorkItemList;
    const reportType = request.body.selectedReportType;
    const fileType = request.body.selectedFileType;

    console.log("Expect: true")
    console.log(Object.hasOwn(TextFileSupportedOperations.SupportedOperations, reportType))

    var result = ReportingEngine.GenerateReports(workItemList, 
                reportType, 
                ReportingEngine.SupportedFileTypes[0]); // todo only text files for now. 

    console.log("Result type:  " + typeof(result) + " \tResult: " + result);

    if(typeof(result) == "string"){
        let filename = result;
        res.download(result)
    } else {
        console.log("Sending result")
        res.send(result)
    }
});

app.post("/GetJobMaterialsMatchingIds/:Job_IDs", (request, response) => {
    const Job_IDs = request.params.Job_IDs;
    //.map(function(str) {return parseInt(str); })
    console.log(Job_IDs)
    db.query(`SELECT * FROM job_material WHERE Job_ID IN (?)`, [Job_IDs.split(",").map(function(str) {return parseInt(str);})], (error, jobMaterials) => {
        if(error) return response.json ("Error");
        return response.json(jobMaterials);       
    })
});

app.post("/GetMaterialsMatchingInventoryIds/:Inventory_ID_List", (request, response) => {
    const Inventory_ID_List = request.params.Inventory_ID_List;

    db.query(`SELECT * FROM material WHERE Inventory_ID IN (?)`, [Inventory_ID_List.split(",").map(function(str) {return parseInt(str);})], (error, material) => {
        if(error) {
            console.log("Error")
            return response.json(material)
        } else{
            return response.json(material);       
        }
    })
    
});

app.post("/GetWorkItemByIds/:Work_Item_ID_List", (request, response) =>{
    const Work_Item_ID_List = request.params.Work_Item_ID_List;

    console.log(Work_Item_ID_List.split(",").map(function(str) {return parseInt(str)}))
    db.query(`SELECT * FROM job WHERE Job_ID IN (?)`, [Work_Item_ID_List.split(",").map(function(str) {return parseInt(str)})], (error, workItem) => {
        if(error) {
            console.log(error) 
        } else {
            return response.json(workItem);
        }
    })

})

app.post("/RemoveJobMaterialsMatchingId/", (request, response) =>{
    const Job_ID = request.body.Job_ID;

    const sql = `
        DELETE FROM job_material 
        WHERE Job_ID = ?
    `;

    db.query(sql, [Job_ID], (error, result) => {
        if (error) {
            return response.status(500).json({ error: 'Error deleting job material' });
        }

        if (result.affectedRows === 0) {
            return response.status(404).json({ error: 'Job Material not found' });
        }

        return response.status(200).json({ message: 'Job Material deleted successfully' });
    });
})


app.get("/GetWorkItem", (request, response) => {
    const sql = "SELECT Job_ID, Contractor_ID, Job_Name, Order_Date FROM job";
    db.query(sql, (error, data) => {
        if(error) return app.json ("Error");
        return response.json(data);
    })
} )

app.get("/GetUserCredentials", (request, response) => {
    const sql = "SELECT * FROM login";
    db.query(sql, (error, data) => {
        if(error) return app.json ("Error");
        return response.json(data);
    })
} )



//[request.body.Address_ID, request.body.Street, request.body.City, request.body.State, request.body.ZIP]
app.put("/UpdateWorkItem/:Job_ID", (request, response) => {
    const Job_ID = request.params.Job_ID;
    const Address_ID = request.body.Address_ID;
    const Contractor_ID = request.body.Contractor_ID;
    const Job_Name = request.body.Job_Name;
    const Order_Date = request.body.Order_Date;
    const install_Date = request.body.install_Date;
    const Payment_Terms = request.body.Payment_Terms;
    const Salesman = request.body.Salesman;
    const Total_Material = request.body.Total_Material;
    const Total_Labor = request.body.Total_Labor;
    const Total = request.body.Total;
    const Complete = request.body.Complete;

    console.log("Received PUT request for Job_ID:", Job_ID);
    console.log("Request body:", request.body);

    const sql = `
        UPDATE job
        SET
        Address_ID = COALESCE(?, Address_ID),
        Contractor_ID = COALESCE(?, Contractor_ID),
        Job_Name = COALESCE(?, Job_Name),
        Order_Date = COALESCE(?, Order_Date),
        install_Date = COALESCE(?, install_Date),
        Payment_Terms = COALESCE(?, Payment_Terms),
        Salesman = COALESCE(?, Salesman),
        Total_Material = COALESCE(?, Total_Material),
        Total_Labor = COALESCE(?, Total_Labor),
        Total = COALESCE(?, Total),
        Complete = COALESCE(?, Complete)
        WHERE Job_ID = ?`;

    console.log("SQL query:", sql);
    
    db.query(sql, [Address_ID, Contractor_ID, Job_Name, Order_Date, install_Date, Payment_Terms, Salesman, Total_Material, Total_Labor, Total, Complete, Job_ID], (error, data) => {
        if (error) {
            console.error("Database error:", error);
            return response.status(500).json({ error: "Database error" });
        }

        console.log("Update successful. Rows affected:", data.affectedRows);
        return response.status(200).json({ message: "Values Updated" });
    });
});



app.post('/login', (request, response) => 
{
    const User_Name=request.body.userUser_Name;
    const Pass=request.body.userPass;
    console.log('Received username:', User_Name);
    console.log('Received password:', Pass);
    const sql = "SELECT * FROM login WHERE User_Name = ? AND  Pass = ?";
    db.query(sql, [User_Name, Pass], (err, result) => {
        if(err) return response.json({Status: "Error", Error: "Error in running query"});
        if(result.length > 0) {
            return response.json({Status: "Success"})
        } else {
           
               //console.log(db.query);
               return response.json({Status: "Error", Error: "Wrong Email or Password"});
            
        }
    })
})

app.post('/adminlogin', (request, response) => 
{
    const User_Name=request.body.adminUser_Name;
    const Pass=request.body.adminPass;
    //console.log('Received username:', User_Name);
    //console.log('Received password:', Pass);
    const sql = "SELECT * FROM login WHERE User_Name = ? AND  Pass = ?";
    db.query(sql, [User_Name, Pass], (err, result) => {
        if(err) return response.json({Status: "Error", Error: "Error in running query"});
        if(result.length > 0) {
            return response.json({Status: "Success"})
        } else {
           
               //console.log(db.query);
               return response.json({Status: "Error", Error: "Wrong Email or Password"});
            
        }
    })
})





app.listen(8081, () => { 
    console.log( "Listening");
})