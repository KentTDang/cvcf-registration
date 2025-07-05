require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(express.static("public"));

const endpointSecret = process.env.STRIPE_WEBSOCKET_KEY;
const DOMAIN = "http://localhost:5173";

// https://docs.stripe.com/checkout/fulfillment
async function fulfillCheckout(sessionId) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  console.log("Fulfilling Checkout Session: ", sessionId);

  // TODO: Make this function safe to run multiple times,
  // even concurrently, with the same session ID

  // TODO: Make sure fulfillment hasn't already been
  // performed for this Checkout Session

  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  if (checkoutSession.payment_status !== "unpaid") {
    // TODO: Perform fulfillment of the line items
    // TODO: Record/save fulfillment status for this
    // Checkout Session
    console.log("YAY checkout session was successful, add db logic here");
  }
}
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    const payload = request.body;
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      fulfillCheckout(event.data.object.id);
    }

    response.status(200).end();
  }
);

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
