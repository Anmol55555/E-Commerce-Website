// For localhost:5000/api/user/<routes-below>

const router = require('express').Router();    // Hence now, instead of writing app, we will write router
const jwt = require("jsonwebtoken");    
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken.js");                // Middleware
const Cart = require('../models/Cart.js');



// CREATE
router.post("/", verifyToken, async (req, res) => {                     
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart); 
    }
    catch (err) {
        res.status(500).json(err);  
    }

});




// PUT REQUEST  =>  To UPDATE the CART data                                            
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {                   // async => make the function async to use await keyword
                                                                                // verifyTokenAndAuthorization() is used to verify the token of the user, as all user can update their own cart, they need not to be specfically admin
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body, 
            }, 
            { new: true }
        );  
        res.status(200).json(updatedCart);
    }
    catch (err) {
        res.status(500).json(err);
    }
});



// DELETE Request to delete a cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {        // verifyTokenAndAuthorization() => as any user can delete their own carts, no need to be specifically admin only.        
    try {                                                                   
        await Cart.findByIdandDelete(req.params.id)
        res.status(200).json("Cart has been deleted ...");
    }
    catch (err) {
        res.status(500).json(err);
    }
});



// GET USER CART                                                               // verifyTokenAndAuthorization() => as any user can see their own carts, no need to be specifically admin only.        
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {           
    try {
        const cart = await Cart.findOne({userId: req.params.userId});                 //  product containing all the info for that given id

        res.status(200).json(cart); 
    }
    catch (err) {
        res.status(500).json(err);
    }
});




// GET ALL CARTS OF ALL USERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {          // verifyTokenAndAdmin() => As only admin will have the authority to get carts of all users
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    }
    catch (err) {
        res.status(500).json(err); 
    }
});



module.exports = router;