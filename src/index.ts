import express from "express";

import { ApolloServer } from "apollo-server-express";
import mergeTypeDefs from "./schema/index.js";
import resolvers from "./resolvers/index.js";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import { stripe } from "./lib/stripe.js";
import { connectDB } from "./db/connect.js";
// import kindeNode from "@kinde-oss/kinde-node";

const endpointSecret =
  "whsec_4ea0b36c3d08d3cf10406422a70450b5869eab9d89156403b583803418d9f7e0";

dotenv.config();

const uri = process.env.DB_URI!;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();

app.use(cors());

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

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

    console.log("🚀 ~ event:", event);
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log("🚀 ~ paymentIntentSucceeded:", paymentIntentSucceeded);
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

// let authorize;

// (async () => {
//   authorize = await kindeNode("https://casemoishop.kinde.com");
//   console.log("🚀 ~ authorize:", authorize);
// })();

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
        // const kindeUser = new Promise((resolve, reject) => {
        //   authorize(req, (err, kindeUser) => {
        //     if (err) {
        //       return reject(err);
        //     }
        //     resolve(kindeUser);
        //   });
        // });

        // console.log("🚀 ~ kindeUser ~ kindeUser:", kindeUser);

        // const tokenHeader = req.headers.authorization || "";
        // const token = tokenHeader.replace("Bearer ", "");
        // const user = await getUserFromToken(token, db);
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
