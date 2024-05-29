import express from "express";
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";
import { ApolloServer } from "apollo-server-express";
import mergeTypeDefs from "./schema/index.js";
import resolvers from "./resolvers/index.js";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import { connectDB } from "./db/connect.js";
import { paymentSuccess } from "./webhooks/stripe.js";
import { sendEmail } from "./lib/awsSendEmail.js";

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
  res.send("Hello World! Welcome to my server!!!");
});

app.post(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  paymentSuccess
);

app.get("/api/test-send-email", async (req, res) => {
  try {
    await sendEmail({
      emailFrom: process.env.EMAIL_SENDER!,
      emailTo: process.env.EMAIL_SENDER!,
      subject: "Test email",
      html: "<h1>Test email</h1>",
    });
    res.send("Email sent!");
  } catch (err) {
    console.log("🚀 ~ app.get ~ err:", err);
    res.status(500).send("Error sending email");
  }
});

(async () => {
  try {
    console.log("💪💪💪 Connecting MongoDB Atlas cluster....");

    await connectDB();

    const server = new ApolloServer({
      typeDefs: [DIRECTIVES, mergeTypeDefs],
      resolvers,
      context: async ({ req }) => {
        const kindeUserId = req.headers.kinde_user_id;
        return { kindeUserId };
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
