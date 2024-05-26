import express from "express";
import { ApolloServer } from "apollo-server-express";
import mergeTypeDefs from "./schema/index.js";
import resolvers from "./resolvers/index.js";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import { connectDB } from "./db/connect.js";
import { paymentSuccess } from "./webhooks/stripe.js";

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
  paymentSuccess
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
