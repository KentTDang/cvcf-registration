// stripe listen --forward-to localhost:4242/webhook

/**
 *  How to parse our form data:
 * {link: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data }
 */

// https://expressjs.com/en/resources/middleware/body-parser.html
// Firstore how to add doc: https://firebase.google.com/docs/firestore/manage-data/add-data

import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import {
  doc,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
  const claimRef = doc(db, "checkout_sessions", session.id);
  let isFulfilled = false;

  // Transactions allows us to check and mark our process in one step, avoiding race conditions
  const alreadyHandled = await runTransaction(db, async (tx) => {
    const snap = await tx.get(claimRef);
    const status = snap.exists() ? snap.data().status : null;

    if (status === "complete" || status === "processing") return true;

    tx.set(
      claimRef,
      { status: "processing", updatedAt: serverTimestamp() },
      { merge: true }
    );
    return false;
  });

  // This early return means that we did not store this attempt in our backup db
  if (alreadyHandled) return;

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(
      session.id,
      {
        expand: ["line_items"],
      }
    );

    if (checkoutSession.payment_status !== "unpaid") {
      isFulfilled = true;

      // Business Write: Store the user form info
      await setDoc(
        doc(db, "summer_2025", session.id),
        {
          firstName: session.metadata.firstName,
          lastName: session.metadata.lastName,
          email: session.metadata.email,
          phoneNumber: session.metadata.phoneNumber,
          daysAttending: session.metadata.daysAttending,
          fulfilled: isFulfilled,
          lastEventAt: serverTimestamp(),
        },
        { merge: true }
      );

      // Mark checkout session as complete
      await updateDoc(claimRef, {
        status: "complete",
        updatedAt: serverTimestamp(),
      });
    } else {
      // Mark checkout session as incomplete due to an incorrect payment status
      await updateDoc(claimRef, {
        status: "incomplete",
        error: "Checkout payment status is'unpaid'.",
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    // Mark checkout session as incomplete
    await updateDoc(claimRef, {
      status: "incomplete",
      error: String(error),
      updatedAt: serverTimestamp(),
    });
  } finally {
    await setDoc(
      doc(db, "summer_backup_2025", session.id),
      {
        firstName: session.metadata.firstName,
        lastName: session.metadata.lastName,
        email: session.metadata.email,
        phoneNumber: session.metadata.phoneNumber,
        daysAttending: session.metadata.daysAttending,
        fulfilled: isFulfilled,
        lastEventAt: serverTimestamp(),
      },
      { merge: true }
    );
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
