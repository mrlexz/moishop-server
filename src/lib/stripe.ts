import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

export const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
  apiVersion: "2024-04-10",
});
