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

app.get("/", (request, response) => {
    const sql = "SELECT * FROM Address";
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

    db.query("INSERT INTO Address (Address_ID, Street, City, State, ZIP) VALUES (?,?,?,?,?)", 
                                          [Address_ID, Street, City, State, ZIP], (error, data) =>{
        if(error) return response.json("Error")
        else return response.send("Values Inserted");
    })
})

//[request.body.Address_ID, request.body.Street, request.body.City, request.body.State, request.body.ZIP]

app.put("/Updateaddress", (request, response) => {
    const sql = "UPDATE Address SET Street = '" + request.body.Street + "' WHERE Address_ID = " + request.body.Address_ID;
    //"UPDATE Address SET (Address_ID, Street, City, State, ZIP) VALUES (?,?,?,?,?)"
    
    const Address_ID = request.body.Address_ID;
    const Street = request.body.Street;
    const City = request.body.City;
    const State = request.body.State;
    const ZIP = request.body.ZIP;
    
    //const id = request.params.id;
    console.log(Address_ID);
    console.log(Street);
    //console.log(City);
    //console.log(State);
    console.log(sql);

    db.query(sql, (error, data) =>{
        if(error) return response.json("Error");
        return response.json("Values Updated");
    })
})


app.post("/Delete", (request, response) => {
    const sql = "DELETE FROM Address WHERE Address_ID = " + request.body.Address_ID;

    const x = request.body.Address_ID;

    console.log(sql);
    db.query(sql, (error, data) =>{
        if(error) return response.json("Error");
        return response.json(data);
    })
})



app.post('/login', (request, response) => 
{
    const User_Name=request.body.User_Name;
    const Pass=request.body.Pass;
    console.log(request.body.User_Name);
    console.log(request.body.Pass);
    const sql = "SELECT * FROM Login WHERE User_Name = ? AND  Pass = ?";
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