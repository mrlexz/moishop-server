import { DateTimeResolver } from "graphql-scalars";

import { mergeResolvers } from "@graphql-tools/merge";
import userResolvers from "./user.js";
import testResolvers from "./test.js";
import configurationResolvers from "./configuration.js";
import orderResolvers from "./order.js";

export const customScalarResolver = {
  DateTime: DateTimeResolver,
};

export default mergeResolvers([
  customScalarResolver,
  userResolvers,
  testResolvers,
  configurationResolvers,
  orderResolvers,
]);
