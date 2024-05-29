// import { mergeTypeDefs } from "@graphql-tools/merge";
// import userSchema from "./user.js";
// import testSchema from "./schema.js";
// import configurationSchema from "./configuration.js";
// import orderSchema from "./order.js";

// import { gql } from "apollo-server-express";

// const rootSchema = gql`
//   scalar Date
//   type Query {
//     _: Boolean
//   }
//   type Mutation {
//     _: Boolean
//   }
//   type Subscription {
//     _: Boolean
//   }
// `;

// export default mergeTypeDefs([
//   rootSchema,
//   userSchema,
//   testSchema,
//   configurationSchema,
//   orderSchema,
// ]);

import path from "path";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const typesArray = loadFilesSync(path.join(__dirname), {
  extensions: ["graphql"],
});

export default mergeTypeDefs(typesArray);
