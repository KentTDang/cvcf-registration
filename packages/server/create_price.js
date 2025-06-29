require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

stripe.products
  .create({
    name: "Starter Subscription",
    description: "$12/Month subscription",
  })
  .then((product) => {
    stripe.prices
      .create({
        unit_amount: 1200,
        currency: "usd",
        recurring: {
          interval: "month",
        },
        product: product.id,
      })
      .then((price) => {
        console.log(
          "Success! Here is your starter subscription product id: " + product.id
        );
        console.log(
          "Success! Here is your starter subscription price id: " + price.id
        );
      });
  });
