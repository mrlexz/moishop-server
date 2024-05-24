import express from "express";

import { ApolloServer } from "apollo-server-express";
import mergeTypeDefs from "./schema/index.js";
import resolvers from "./resolvers/index.js";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import { stripe } from "./lib/stripe.js";
import { connectDB } from "./db/connect.js";
import Stripe from "stripe";
import BillingAddress from "./models/billingAddress.model.js";
import ShippingAddress from "./models/shippingAddress.model.js";
import Order from "./models/order.model.js";
// import kindeNode from "@kinde-oss/kinde-node";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY!;

dotenv.config();

const uri = process.env.DB_URI!;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express() as any;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    try {
      const sig = request.headers["stripe-signature"];

      let event: null | Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          sig!,
          endpointSecret
        );
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      // Handle the event
      if (!event) {
        throw new Error("Event is not defined");
      }

      switch (event.type) {
        case "checkout.session.completed":
          if (!event.data.object.customer_details?.email) {
            throw new Error("Email is not defined");
          }

          const session = event.data.object as Stripe.Checkout.Session;

          console.log("🚀 ~ session:", session);
          const { userId, orderId } = session.metadata || {
            userId: null,
            orderId: null,
          };

          if (!userId || !orderId) {
            throw new Error("User or Order Id is not defined");
          }

          const billingAddress = session.customer_details!.address;
          const shippingAddress = session.shipping_details!.address;

          const newBillingAddress = new BillingAddress({
            name: session.customer_details!.name,
            city: billingAddress!.city,
            country: billingAddress!.country,
            street: billingAddress!.line1,
            postalCode: billingAddress!.postal_code,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: billingAddress!.state,
          });

          const newBillingData = await newBillingAddress.save();

          const newShippingAddress = new ShippingAddress({
            name: session.customer_details!.name,
            city: shippingAddress!.city,
            country: shippingAddress!.country,
            street: shippingAddress!.line1,
            postalCode: shippingAddress!.postal_code,
            createdAt: new Date(),
            updatedAt: new Date(),
            state: shippingAddress!.state,
          });

          const newShippingData = await newShippingAddress.save();

          await Order.findOneAndUpdate(
            {
              _id: orderId,
            },
            {
              isPaid: true,
              billingAddressId: newBillingData._id,
              shippingAddressId: newShippingData._id,
              updatedAt: new Date(),
            }
          );

          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      response.send({
        event,
        ok: true,
      });
    } catch (error) {
      response.send({
        message: "Something went wrong",
        ok: false,
      });
    }
  }
);

(async () => {
  try {
    await connectDB();
    await client.connect();
    console.log(
      "👉 Pinged your deployment. You successfully connected to MongoDB! 👈"
    );
    const db = client.db(process.env.DB_NAME!);

    const server = new ApolloServer({
      typeDefs: mergeTypeDefs,
      resolvers,
      context: async ({ req }) => {
        const kindeUserId = req.headers.kinde_user_id;
        return { db, kindeUserId };
      },
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT: string | number = 4000;

    app.listen(PORT, () => {
      console.log(
        `🚀🚀🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.log("😱😱😱😱😱 ~ Somethings ain't right:", err);
  } finally {
    // await client.close();
  }
})();
