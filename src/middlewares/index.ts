import authMiddleWare from "./authMiddleWare.js";

const resolverAuthMiddleware = {
  // Query: {
  //   getAuthStatus: authMiddleWare,
  // },
  Mutation: {
    createCheckoutSession: authMiddleWare,
  },
};

export default [resolverAuthMiddleware];
