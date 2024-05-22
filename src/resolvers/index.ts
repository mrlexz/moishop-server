import pkg from "graphql-iso-date";
import userResolvers from "./user.js";
import testResolvers from "./test.js";
import configurationResolvers from "./configuration.js";
import orderResolvers from "./order.js";

const { GraphQLDateTime } = pkg;
const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  testResolvers,
  configurationResolvers,
  orderResolvers,
];
