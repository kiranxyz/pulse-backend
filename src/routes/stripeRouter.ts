import { Router } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const router = Router();
const stripe = new Stripe(process.env.PK_TEST_STRIPE_SECRET_KEY as string);

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
      //automatic_payment_methods: { enabled: true },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
