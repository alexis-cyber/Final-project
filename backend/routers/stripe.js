const express = require('express');
const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const connections = require('./connections');
// const router = require('./Routers/productRouters');
// const userRouter = require('./Routers/userRouters');
require("dotenv").config();
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_KEY);
//'sk_test_51OBu89AsaKnsjFZtKFe99LCqXb1Z0T4NK96z53h5vUBdkb4Y79lEOwlfkjeTVyPxx9LSQJIE3EtKVp69reeSyBUe00hHUHFsiv'

const router = express.Router();




// const YOUR_DOMAIN = 'http://localhost:3000';

router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.YOUR_DOMAIN}/checkout-success`,
      cancel_url: `${process.env.YOUR_DOMAIN}/cart`,
    });

    res.send({url: session.url});
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).send({ msg: 'Internal server error (create-checkout-session)' });
  }
});

module.exports = router;