import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export default async function authMiddleWare(
  resolve,
  parent,
  args,
  context,
  info
) {
  const { req } = context;

  if (!req.headers.authorization) {
    throw new GraphQLError("Authorize provided not valid", {
      extensions: { code: "TOKEN_NOT_VALID" },
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new GraphQLError("Token is expired", {
      extensions: { code: "TOKEN_EXPIRED" },
    });
  }

  return await resolve(parent, args, context, info);
}
