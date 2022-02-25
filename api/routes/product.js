// For localhost:5000/api/products/<routes-below>

const router = require('express').Router();    // Hence now, instead of writing app, we will write router
const jwt = require("jsonwebtoken");    
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken.js");                // Middleware
const Product = require('../models/Product.js');



// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {                     // verifyTokenAndAdmin() is used to verify the token and the user must be an admin only as only admin can change products details, hence verifyTokenAndAuthorization is not used
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct); 
    }
    catch (err) {
        res.status(500).json(err);  
    }

});




// PUT REQUEST  =>  To UPDATE the PRODUCT data              // Hence to update, we will verify user's jwt web token to verify that the this user has the authority to update this product or not.                                 
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {                   // async => make the function async to use await keyword
                                                                                // verifyTokenAndAdmin() is used to verify the token and the user must be an admin only as only admin can change products details, hence verifyTokenAndAuthorization is not used
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body, 
            }, 
            { new: true }
        );  
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
});



// DELETE Request to delete a product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {        
    // console.log('on delete');
    try {                                              
        // console.log(req.params.id);                 
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted ...");
    }
    catch (err) {
        res.status(500).json(err);
    }
});



// GET Product with given id                                          // Since anybody can see the product, hence no need to verify the user using jwt web token
router.get("/find/:id", async (req, res) => {           
    try {
        const product = await Product.findById(req.params.id)                 //  product containing all the info for that given id

        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json(err);
    }
});




// GET ALL PRODUCTS                                                     
router.get("/", async (req, res) => {           // Since anybody can see the product, hence no need to verify the user using jwt web token
    const qNew = req.query.new;                                    // Here we will accept 2 queries, new and categories
    const qCategory = req.query.category;
    try {
        let products;

        if(qNew)                // If new query exist, => show latest 5 products
        {
            products = await Product.find().sort({createdAt: -1}).limit(5);
        }
        else if(qCategory)      // If category query exist, => show all the products where the given query category is included
        {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        }
        else                    // If no query exist, => show all the products
        {
            products = await Product.find();
        }
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;