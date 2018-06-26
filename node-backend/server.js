const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/test",(err)=>{
    if(err){
        console.log(err);
    }else{
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
    res.json({
        users: {
            name: "Akilan",
            location: "Bangalore"
        }
    });
})

// Login action & set JSON web token

app.post("/api/login", (req, res) => {

    if (req.body != null) {
        let login_data = req.body;
        console.log(login_data);
        if (login_data.name == "admin" && login_data.password == "admin") {
            user = {
                name: "admin",
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
        res.sendStatus(403);
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
                console.log(err)
            } else {
                console.log(decoded);
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