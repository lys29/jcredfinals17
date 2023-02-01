const db = require("./db");
const bcrypt = require("bcrypt");
const localStratagy = require("passport-local").Strategy;

module.exports = function(passport) {
    passport.use(
        new localStratagy((email, password, done) => {
            console.log("email",email)
            console.log("pass",password)
            const query = "SELECT * FROM cpet17finals.users where email = ?";
            db.query(query, [email], (err, result) => {
                if(err) {throw err;}
                if(result.length === 0){
                    return done(null, false)
                }
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if(err) {throw err;}
                    if(response === true ){
                        return done (null, result[0]);
                    }
                    else{
                        return done(null, false);
                    }
                })
            })
        })
    )
    
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        const query = "SELECT * FROM cpet17finals.users where email = ?";
        db.query(query, [id], (err, result) => {
            if(err) {throw err;}
            const userInfo = {
                id: result[0].id,
                email: result[0].email
            }
            done(null, userInfo);
        })
    })
}