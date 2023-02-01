const express = require("express");
const boddParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const db = require('./db');
const app = express();

app.use(boddParser.json());
app.use(boddParser.urlencoded({ extended: true}));
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false}));

app.use(cors({
    origin: 'http://localhost:3000',
    //palitan ng IP
    credentials: true
}));

app.use(cookieParser('mySecretKey'));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.get('/', (req, res) => {
    res.send("SERVER RUNNING!");
});

//SIGN UP 
app.post('/createaccount', (req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    
    const query = "INSERT INTO users (`fullname`, `email`, `password`,`confirmpassword`) VALUES (?, ?, ?, ?)";
    const query2 = "SELECT * FROM users WHERE email = ?";
    
    db.query(query2, [email], (err, result) => {
        if(err) {throw err;}
        if(result.length > 0) {
            res.send({message: "Email Taken"});
       
        }

        if(result.length === 0){
            const hashedPassword = bcrypt.hashSync(password, 10)
            const hashedConfirmPassword = bcrypt.hashSync(confirmpassword, 10)
            db.query(query, [fullname, email, hashedPassword, hashedConfirmPassword], (err, result) => {
                if(err) {throw err;}
                res.send({message: "User Created!"});
            
            })
        }
    });
});

//LOG IN
app.post('/signin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {throw err;}
        if(!user) {
            res.send({message: "Not existing user"});
            }

            if(user) {
                req.signin(user, (err) => {
                    if(err) {throw err;}
                    res.send({message: "User Successfully Signed in"});
                    console.log(user);
                 
                })
            }
        
    })(req, res, next);
});

//CAHNGE PASSWORD
app.post('/forgot_password', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    const query = `UPDATE users SET password = ?, confirmpassword = ? WHERE email = ?`;


    const hashedPassword = bcrypt.hashSync(password, 10);
    const hashedConfirmPassword = bcrypt.hashSync(confirmpassword, 10);
    db.query(query, [hashedPassword, hashedConfirmPassword, email], (err, result) => {
        if(err) {throw err;}
        res.send({message: "Your Password has been updated!"});
        console.log("Your Password has been updated!");
        
    })
    

});

app.get('/getUser', (req, res) => {
    res.send.apply(req.user);
});



app.listen(3004, () => {
    console.log("Server Started on port 3004")
});