import express from "express";

import { ApolloServer } from "apollo-server-express";
import schema from "./schema/index.js";
import resolvers from "./resolvers/index.js";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import { getUserFromToken } from "./lib/token.js";
import cors from "cors";
// import kindeNode from "@kinde-oss/kinde-node";

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

// let authorize;

// (async () => {
//   authorize = await kindeNode("https://casemoishop.kinde.com");
//   console.log("🚀 ~ authorize:", authorize);
// })();

(async () => {
  try {
    await client.connect();
    console.log(
      "👉 Pinged your deployment. You successfully connected to MongoDB! 👈"
    );
    const db = client.db(process.env.DB_NAME!);

    const server = new ApolloServer({
      typeDefs: schema,
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

        const tokenHeader = req.headers.authorization || "";
        const token = tokenHeader.replace("Bearer ", "");
        const user = await getUserFromToken(token, db);
        return { db, user };
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
