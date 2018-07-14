'use strict';

const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');

// Load Employee model
require("./model/Employee");
const Employee = mongoose.model('employees');


const app = express();
app.use(cors()); // Allow Cross origin request

const db = require("./config/dev");


mongoose.connect(db.mongoURL, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Mongodb connected");
    }
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({ "name": "Akilan" });
})

// Get all the employees after successfull verification
app.get("/api/getEmployees", verifyToken, (req, res) => {

    Employee.find({}).then(employees => {
        //console.log(employees);
        res.json({
            employees: employees
        });
    })
})


// Get the employee by id after successfull verification
app.get("/api/getEmployee/:id", verifyToken, (req, res) => {

    let emp_id = req.params.id;

    Employee.find({id:emp_id}).then(employee => {
        //console.log(employee);
        res.json({
            employee: employee
        });
    })
})

// Delete the employee by id after successfull verification
app.get("/api/deleteEmployee/:id", verifyToken, (req, res) => {

    let emp_id = req.params.id;

    Employee.findByIdAndRemove(emp_id,(err,response)=>{
        if(err){
            res.json({
                error: "Failed to delete"
            });
        }else{
            res.json({
                success: "Employee deleted successfully"
            });
        }
    })

})


// Add Employee after successfull token verification
app.post("/api/addEmployee", verifyToken, (req, res) => {

    if (req.body != null) {
        let emp_data = req.body;
        //console.log(emp_data);

        let newEmp = new Employee();
        newEmp.id = emp_data.emp_id;
        newEmp.name = emp_data.emp_name;
        newEmp.location = emp_data.emp_location;
        newEmp.role = emp_data.emp_role;
        newEmp.email = emp_data.emp_email;
        newEmp.ext = emp_data.emp_ext;


        newEmp.save((err, result) => {
            if (err) {
                res.json({
                    error: "Add Employee failed"
                });
            } else {
                console.log(result);
                res.json({
                    success: "Employee Added Successfully"
                });
            }
        })
    } else {
        res.sendStatus(403);
    }

})


// Edit Employee after successfull token verification
app.post("/api/editEmployee", verifyToken, (req, res) => {

    if (req.body != null) {
        let emp_data = req.body;
        console.log(emp_data);

       let uid = emp_data.emp_uid;

        let updateData = {
            id: emp_data.emp_id,
            name: emp_data.emp_name,
            location: emp_data.emp_location,
            role: emp_data.emp_role,
            email: emp_data.emp_email,
            ext: emp_data.emp_ext
        }

        Employee.findByIdAndUpdate(uid,updateData,(err,result)=>{
            if (err) {
                res.json({
                    error: "Edit Employee failed"
                });
            } else {
                console.log(result);
                res.json({
                    success: "Employee Updated Successfully"
                });
            }
        })
    } else {
        res.sendStatus(403);
    }

})


// Login action & set JSON web token

app.post("/api/login", (req, res) => {

    if (req.body != null) {
        let login_data = req.body;
        //console.log(login_data);
        if (login_data.user_name == "admin" && login_data.password == "admin") {
            let user = {
                name: login_data.user_name,
                role: "admin"
            }

            jwt.sign({ user: user }, "secretkey", (err, token) => {
                res.json({
                    token: token
                });
            })
        } else {
            res.json({
                error: "Login failed"
            });
        }
    } else {
        //console.log("No data to login")
        res.json({
            error: "Login failed"
        });
    }

})

// Verifying JSON web token

function verifyToken(req, res, next) {

    const headerInfo = req.headers["authorization"];

    if (headerInfo != null) {
        let authArray = headerInfo.split(" ");
        let token = authArray[1];
        jwt.verify(token, "secretkey", (err, decoded) => {
            if (err) {
                //console.log(err)
            } else {
                //console.log(decoded);
                next();
            }
        })

    } else {
        res.sendStatus(403);
    }
}

// Starting app on port 5000
app.listen(5000, () => {
    console.log("Application started on port 5000");
})

module.exports = app;