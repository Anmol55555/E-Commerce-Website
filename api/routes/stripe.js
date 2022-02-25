// Contains Stripe Funtionality         // Stripe => Payment Gateway Method

const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);   

router.post('/payment', (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,          // when we make a payment on the client side, the stripe will return us a token
            amount: req.body.amount,
            currency: "usd",
        },                                          // After creating charges, it will give either error(stripeErr) or some response(stripeRes) to it
        (stripeErr, stripeRes) => {
            if(stripeErr) {
                res.status(500).json(stripeErr);
            }
            else {
                res.status(200).json(stripeRes);
            }
        }
    );
});


module.exports = router;