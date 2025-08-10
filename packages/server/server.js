// stripe listen --forward-to localhost:4242/webhook

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

  // TODO: Make this function safe to run multiple times, even concurrently, with the same session ID
  // The above might be accounted for with the if statement on lines 78-81

  // TODO: Make sure fulfillment hasn't already been performed for this Checkout Session
  // An approach might be to use our database, store the session id, and fulfillment status

  const checkoutSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items"],
  });

  if (checkoutSession.payment_status !== "unpaid") {
    // TODO: Perform fulfillment of the line items
    // Not entirely sure what this means

    // TODO: Record/save fulfillment status for this Checkout Session
    // This means updating the session status in our db

    console.log(
      "Checkout Session Fulfilled, metadata: ",
      session.metadata.firstName,
      session.metadata.lastName
    );
    // Firstore how to add doc: https://firebase.google.com/docs/firestore/manage-data/add-data
    await setDoc(doc(db, "Summer 2025", "some uuid that neeeds to be added"), {
      firstName: session.metadata.firstName,
      lastName: session.metadata.lastName,
      email: session.metadata.email,
      phoneNumber: session.metadata.phoneNumber,
      daysAttending: session.metadata.daysAttending,
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
  const { firstName, lastName, email, phoneNumber, daysAttending } = req.body;
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
    metadata: { firstName, lastName, email, phoneNumber, daysAttending },
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));
