const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3009;
const hostname = 'localhost';
//palitan ng Ip
var bodyParser = require('body-parser');
var dateTime = require('node-datetime');
var dt = dateTime.create();
const cors = require("cors")
app.use(cors())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
const path = require('path');
const { connect } = require("http2");
const {spawn} = require('child_process');
const axios = require ('axios');


// MYSQL 
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "elai",
    database: "cpet17finals",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to Database!");
});


app.get('/', function (req, res) {
    // CREATE DATABASE IF NOT EXISTING YET
    connection.query("CREATE DATABASE IF NOT EXISTS JCRED",
        function (err, results) {
            if (err) throw err;
            console.log(req.query);
            console.log(results);
        });

    var images_table = ("CREATE TABLE IF NOT EXISTS images_table (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), image LONGBLOB, datetime VARCHAR(100) )")
    var users = ("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(45), password VARCHAR(100), confirmpassword VARCHAR(100))")
    
    connection.query(users, function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log("User Table created!");
    });

    connection.query(images_table, function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log("Motion Table created!");
    });

    res.send("DATABASE MADE!")

});

app.get('/on_camera',(req, res) => {
    // res.send('WELCOME!')
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['motion_detector_picture.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send("CAMERA OFF")
    });
});


// INSERT WITH PICTURE AND DATETIME
app.post("/motion_detector", (req, res) => {
    const {
        datetime,
        image }
        = req.body;

    connection.query(
        "INSERT INTO images_table (datetime, image) VALUES (?,?)", [datetime, image],
        function (err, results) {
            console.log(results);
            res.json(results);
        })

});

//DISPLAY IMAGES IN DASHBOARD
app.get("/imagedisplay", (req, res) => {
    connection.query(
        "SELECT * FROM `images_table` ORDER BY id DESC",
        function (err, results) {
            if (err) throw err;
            try {
                if (results.length > 0) {
                    res.json({data : results});
                    console.log(results);
                }
            }
            catch (err) {
                res.json({ message: err });
            }

        })
});


// createaccount  
app.post("/Newa", (req, res) => {
    const {
        fullname,
        email,
        password,
        confirmpassword
    } = req.body;
    connection.query(
        "INSERT INTO users (fullname, email, password, confirmpassword) VALUES (?,?,?,?)", [fullname, email, password, confirmpassword]),
        function (err, results) {
            if (err) throw err;
            console.log(req.query);
            console.log(results);
            res.send(results);
            console.log("User added!");
        }

    connection.query(
        "SELECT * FROM `users`",
        function (err, results) {
            if (err) throw err;
            console.log(req.query);
            console.log(results);
            res.send(results);
        })

});

// signin

// RESET PASSWORD

// DISPLAY TABLE IN DASHBOARD

// DISPLAY IMAGES IN DASHBOARD
app.get("/imagedisplay", (req, res) => {
    connection.query(
        "SELECT * FROM `images_table`",
        function (err, results,date_time) {
            if (err) throw err;
            try {
                if (results.length > 0) {
                    let base64array = [];
                    for (let i = 0; i < results.length; i++) {
                        base64array.push({
                            data: new Buffer.from(results[i].image).toString("utf8"),
                            
                        });
                    }
                    res.json(base64array);
                    res.send(date_time);
                    console.log(results);
                }
            }
            catch (err) {
                res.json({ message: err });
            }

        })
});

// SERVER LISTENER
app.listen(port, hostname, () => {
    console.log('Server Active on http://' + hostname + ":" + port + "/");
});