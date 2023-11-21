const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
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