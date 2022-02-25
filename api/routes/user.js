// For localhost:5000/api/user/<routes-below>

const router = require('express').Router();    // Hence now, instead of writing app, we will write router
const jwt = require("jsonwebtoken");    
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken.js");                // Middleware
const User = require('../models/User');




// PUT REQUEST  =>  To Update the user data              // Hence to update, First we will verify the user password and then verify their jwt web token to verify that the this user has the authority to update this post or not.                                 
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {                   // async => make the function async to use await keyword
    if(req.body.password) {                                             // verifyTokenAndAuthorization() is to verify the user to perform CRUD operations 
        req.body.password = CryptoJS.AES.encrypt(                      // encrypting user password
            req.body.password,  
            process.env.PASS_SEC
        ).toString();
    }

    

    // Now if the user get verified and authorize to update that post, now we will update it
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body, 
            }, 
            { new: true }
        );  
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
});



// DELETE Request to delete a user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {        // verifyTokenAndAuthorization() is to verify the user to perform CRUD operations 
    try {                                                               
        await User.findByIdandDelete(req.params.id)
        res.status(200).json("User has been deleted ...");
    }
    catch (err) {
        res.status(500).json(err);
    }
});



// GET USER with given id                                                    // Only admin get any user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {           // verifyTokenAndAdmin() => To verify the token of the user and to verify that the user is admin only as only admin can get users only
    try {
        const user = await User.findById(req.params.id)                 //  user containing all the info for that given id

        const { password, ...others } = user._doc;                      // To exclude password such that others contains all the info except the passsword to show afterwards

        res.status(200).json(others);
    }
    catch (err) {
        res.status(500).json(err);
    }
});




// GET ALL USER                                                     // Only admin get any user
router.get("/", verifyTokenAndAdmin, async (req, res) => {           // verifyTokenAndAdmin() => To verify the token of the user and to verify that the user is admin only as only admin can get users only
    const query = req.query.new;                                    // Here we will accept 1 query => new which if is true then we will show the latest 5 users
    try {
        const users = query                                         // If there some query exist , then => 
        ? await User.find().sort({ _id: -1 }).limit(5)              // users = all info about top 5 user
        : await User.find();                                        //  users = all the info about all the users
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});



// GET USER STATS                                                   // It gonna return total number of users per month
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();                                                // will give current date
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));    // will give current date but with last year

    try {
        const data = await User.aggregate([                                 // In SQL COUNT(*) and with GROUP BY is an equivalent of MongoDB aggregation.
          { $match: { createdAt: { $gte: lastYear } } },                    // match is equivalent to WHERE in SQL    // gte = greater than
          {
            $project: {
              month: { $month: "$createdAt" },                              // creating a month variable where it will take month part from createdAt and assign it to month variable
            },
          },
          {
            $group: {                                                       // GROUP BY month
              _id: "$month",
              total: { $sum: 1 },
            },
          },
        ]);
        res.status(200).json(data)
      } catch (err) {   
        res.status(500).json(err);
      }


});



module.exports = router;