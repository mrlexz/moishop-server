import express from "express";
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";
import { ApolloServer } from "apollo-server-express";
import mergeTypeDefs from "./schema/index.js";
import resolvers from "./resolvers/index.js";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/connect.js";
import { paymentSuccess } from "./webhooks/stripe.js";
import { sendEmail } from "./lib/awsSendEmail.js";
import { jwtDecode } from "jwt-decode";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { IResolvers } from "graphql-middleware/types";
import resolverMiddlewares from "./middlewares/index.js";

dotenv.config();

const app = express() as any;

app.use(cors());

app.get("/", (req, res) => {
  res.send("💋 Hello World! Welcome to my server!!! =>>>>>>>>>>>>>>>>>>>>");
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

    const executableSchema = makeExecutableSchema({
      typeDefs: [DIRECTIVES, mergeTypeDefs],
      resolvers: resolvers as IResolvers<any, any> | IResolvers<any, any>[],
    });
    const schemaWithMiddleware = applyMiddleware(
      executableSchema,
      ...resolverMiddlewares
    );

    const server = new ApolloServer({
      typeDefs: [DIRECTIVES, mergeTypeDefs],
      resolvers,
      context: async ({ req }) => {
        const token = req.headers?.authorization
          ? req.headers.authorization.split(" ")[1]
          : null;
        const decoded = token
          ? jwtDecode<{ userId: string; email: string }>(token)
          : {
              userId: null,
              email: null,
            };
        return {
          req,
          userId: decoded.userId ?? null,
        };
      },
      schema: schemaWithMiddleware, // add this property
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
