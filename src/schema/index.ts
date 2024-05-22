import userSchema from "./user.js";
import testSchema from "./schema.js";
import configurationSchema from "./configuration.js";
import orderSchema from "./order.js";

import { gql } from "apollo-server-express";

const rootSchema = gql`
  scalar Date
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [
  rootSchema,
  userSchema,
  testSchema,
  configurationSchema,
  orderSchema,
];
