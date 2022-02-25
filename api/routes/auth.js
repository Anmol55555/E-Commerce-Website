// Authentication Page

const router = require('express').Router();         // Hence now, instead of writing app, we will write router like app.get() type
const User = require('../models/User.js');          // Importing User Schema
const CryptoJS = require("crypto-js");              // Uses Ciphers Algorithm AES to encrypt password 
const jwt = require("jsonwebtoken");                // To verify our users after login for delete, edit, etc type of requests


// REGISTER
router.post('/register', async (req, res) => {                  // async => make the function async to use await keyword on savedUser
    const newUser = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(                      // encrypting user password
                req.body.password,  
                process.env.PASS_SEC
            ).toString()
        }
    );
    
    try {                                                    // will try to do the steps inside this try function, it any steps throws errpr, the below catch function will run
        const savedUser = await newUser.save();              // to save the new user in db         // returns a promise
        res.status(201).json(savedUser);                     // status = 201 => successfully added
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// LOGIN 
router.post('/login', async (req, res) => {         // async => make the function async to use await keyword
    try {                                           // Since using await, i.e. returning promise, Hence using try and catch
        const user = await User.findOne({ username: req.body.username});            // .findOne() => To search in the database for a match for given username
        if(!user)                                                            // If no user exist
        {
            // res.status(401).json("Wrong credentials");
            throw "Wrong credentials";                                      // This will be passed as error in catch block                   
        }
        
        const hashedPassword = CryptoJS.AES.decrypt(                        // Decrypting the password corresponding to the username filled and matched with the db         // db me jo saved password tha usko decrypt kar rhe h
            user.password,                                                  // encrypted password saved corresponding to the entered username
            process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);        // getting password corresponding to the username given from the data base (us username ke corresponding jo password h database me i.e. correct password for that user) 

        if(originalPassword != req.body.password)                                   // If password doesn't match
        {
            // res.status(401).json("Wrong Credentials");
            throw "Wrong credentials";                                      // This will be passed as error in catch block
        }

        // Creating JWT Token
        const accessToken = jwt.sign(           // The JWT Token provided by us to every user will contain the _id and isAdmin property of User Schema to uniquely identify each user
            {
                id: user._id, 
                isAdmin: user.isAdmin           // If the user is Admin only, then it can perform CRUD operation for any user
            }, 
            process.env.JWT_SEC,                // JWT secret key stored in .env file
            {
                expiresIn: "3d"                            // after 3 days, we should login again as this Token will expire
            }
        )

        const { password, ...others } = user._doc;                  // To make "others" have every detail except password to show later as a response
 
        // If the username and password matched
        res.status(200).json({...others, accessToken});

    }
    catch (err) {
        res.status(500).json(err);
    }

});


module.exports = router;