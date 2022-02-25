// For localhost:5000/api/user/<routes-below>

const router = require('express').Router();    // Hence now, instead of writing app, we will write router
const jwt = require("jsonwebtoken");    
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken.js");                // Middleware
const Order = require('../models/Order.js');



// CREATE
router.post("/", verifyToken, async (req, res) => {                     
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder); 
    }
    catch (err) {
        res.status(500).json(err);  
    }

});




// PUT REQUEST  =>  To UPDATE the ORDER data                                            
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {                   // async => make the function async to use await keyword
                                                                                // verifyTokenAndAdmin() is used to verify the token of the user, and the user must be the admin only, as only admin is allowed to update the Order details after the order have been placed
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body, 
            }, 
            { new: true }
        );  
        res.status(200).json(updatedOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }
});



// DELETE Request to delete a cart
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {        // verifyTokenAndAdmin() is used to verify the token of the user, and the user must be the admin only, as only admin is allowed to delete the Order details after the order have been placed
    try {                                                                   
        await Order.findByIdandDelete(req.params.id)
        res.status(200).json("Order has been deleted ...");
    }
    catch (err) {
        res.status(500).json(err);
    }
});



// GET USER ORDERS                                                                 // verifyTokenAndAuthorization() => as any user can see their own orders, no need to be specifically admin only.        
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {           
    try {
        const orders = await Order.find({userId: req.params.userId});             // orders = containing all the info about the orders for the given userId

        res.status(200).json(orders); 
    }
    catch (err) {
        res.status(500).json(err);
    }
});




// GET ALL ORDERS OF ALL USERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {          // verifyTokenAndAdmin() => As only admin will have the authority to get all the orders of all users
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json(err); 
    }
});



// ORDER STATS :-  GET MONTHLY INCOME ( income of current and last month)
router.get('/income', verifyTokenAndAdmin, async (req, res) => {        // verifyTokenAndAdmin() => As only admin can get all this data of  monthly income
    const productId = req.query.pid;
    const date = new Date();                                                    // date = current date      , eg: if date = 1st August
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));             // lastMonth = current date with month = current Date - 1     , eg: then lastMonth = 1st July
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));      // previousMonth() = current date with month = current Date - 2      , eg: previousMonth = 1st June

    try {
        const income = await Order.aggregate([                             // aggregate = equivalent to GROUP BY with COUNT(*)
            {   $match: {                                                  // match is equivalent to WHERE in SQL    // gte = greater than
                    createdAt: { $gte: previousMonth },                      // i.e WHERE createdAt > previousMonth i.e. to show all the details for the months greater than previousMonth, i.e. last 2 months data
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },
            },                    
            {                                                                       
                $project: {
                    month: { $month: "$createdAt" },                                // getting variable month = month for every createdAt
                    sales: "$amount",                                               // variable sales = amount key value in Order schema
                },
            },
            {
                $group: {                                                       // GROUP BY month
                    _id: "$month",
                    total: { $sum: "$sales"}                                    // getting sum of all the sales for that month
                },
            },   
        ]);
        // console.log(income);
        res.status(200).json(income); 
    }
    catch (err) {
        res.status(500).json(err);
    }



});


module.exports = router;