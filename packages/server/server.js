require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");

const app = express();

app.use(express.static("public"));

const DOMAIN = "http://localhost:5173";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          unit_amount: 100, // 100 -> $1.00 usd
          currency: "usd",
          product: process.env.PRODUCT_ID,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${DOMAIN}/success`,
    cancel_url: `${DOMAIN}/cancel`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));
