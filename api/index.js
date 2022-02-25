// express  => node js framework
// mongoose => To use mongo db 
// dotenv   => npm module to hide secret keys like payment keys so that no other person can access it.
// nodemon  => For hot reload, i.e. live server for nodemon to not every time node index.js for refresh using npm start
//              So whenever we make any change, it auto refreshes and restart
// stripe   => For payment services (npm i stripe)

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user.js');              // page contains all the user routes
const authRoute = require('./routes/auth.js');              // page contains all the authentication routes
const productRoute = require('./routes/product.js');        // page contains all the product routes
const cartRoute = require('./routes/cart.js');              // page contains all the cart routes
const orderRoute = require('./routes/order.js');            // page contains all the order routes
const stripeRoute = require('./routes/stripe.js');          // page contains all the stripe routes
const cors = require('cors');
// Initializing Express
const app = express();                                  

// Initializing dotenv
dotenv.config();

// Initializing port number to listen
app.listen(process.env.PORT || 5000, ()=>{                                 
    console.log('Backend Server is running...');
    console.log('listening to port 5000');
})

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)                             // getting mongodb connect link through .env file so that it remains safe and protected
    .then(() => {console.log('DB Connection Successfull.!');})
    .catch((err) => {console.log('DB Connection Error');     console.log(err);});


app.use(cors());
app.use(express.json());                                    // To pass any json file as post request
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);





