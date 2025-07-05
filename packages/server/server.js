/**
 *  How to parse our form data:
 * {link: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data }
 */

// https://expressjs.com/en/resources/middleware/body-parser.html

import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded();

// parse application/json
const jsonParser = bodyParser.raw({ type: "application/json" });

const endpointSecret = process.env.STRIPE_WEBSOCKET_KEY;
const DOMAIN = "http://localhost:5173";

// https://docs.stripe.com/checkout/fulfillment
async function fulfillCheckout(session) {
  console.log("Fulfilling Checkout Session: ", session.id);

  // TODO: Make this function safe to run multiple times,
  // even concurrently, with the same session ID

  // TODO: Make sure fulfillment hasn't already been
  // performed for this Checkout Session

  const checkoutSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items"],
  });

  // TODO: Is unpaid to only status we need to account for?
  if (checkoutSession.payment_status !== "unpaid") {
    // TODO: Perform fulfillment of the line items
    // TODO: Record/save fulfillment status for this
    // Checkout Session
    console.log(
      "YAY checkout session was successful, add db logic here, pretend we're adding: ",
      session.metadata.firstName,
      session.metadata.lastName
    );
    // Firstore how to add doc: https://firebase.google.com/docs/firestore/manage-data/add-data
    await setDoc(doc(db, "cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
      test: "Firebase env keys baby",
    });
  }
}

app.post("/webhook", jsonParser, async (request, response) => {
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
    const session = event.data.object;
    fulfillCheckout(session);
    console.log(
      "My webhook now sees the data: ",
      session.metadata.firstName,
      session.metadata.lastName
    );
  }

  response.status(200).end();
});

app.post("/create-checkout-session", urlencodedParser, async (req, res) => {
  const { firstName, lastName } = req.body;
  console.log("Passing in metadata: ", firstName, lastName);
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
    metadata: { firstName, lastName },
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));
