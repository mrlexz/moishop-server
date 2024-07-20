import { ObjectId } from "mongodb";
import User from "./../models/user.model.js";
import Order from "./../models/order.model.js";
import { Resolvers } from "../generated/graphql.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

const resolvers: Resolvers = {
  Query: {
    users: async (_, __) => {
      const users = await User.find();
      return users;
    },
    getAuthStatus: async (_, { input }, { userId }) => {
      if (userId) {
        const currentUser = await User.findOne({
          _id: new ObjectId(userId),
        });

        if (!currentUser) {
          throw new Error("User not found");
        }

        return {
          success: true,
          user: currentUser,
        };
      }

      const user = input?.user;

      if (!user?.id || !user.email) {
        throw new Error("Invalid user input");
      }

      const existingUser = await User.findOne({
        email: user.email,
      });

      if (!existingUser) {
        const newUser = new User({
          name: user.given_name,
          email: user.email,
          createdAt: new Date(),
          updatedAt: new Date(),
          kindeUserId: user.id,
        });

        const result = await newUser.save();
        const userResult = await User.findOne({ _id: result._id });

        const token = jwt.sign(
          { userId: userResult?.id, email: userResult?.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        return {
          success: true,
          user: userResult,
          token,
        };
      }

      const token = jwt.sign(
        { userId: existingUser?.id, email: existingUser?.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return {
        success: true,
        user: existingUser,
        token,
      };
    },
  },
  Mutation: {
    signIn: async (_, { input }) => {
      const { email, password } = input;

      if (!email || !password) {
        throw new GraphQLError("Invalid email and password", {
          extensions: { code: "INVALID_EMAIL_PASSWORD" },
        });
      }

      const existingUser = await User.findOne({
        email: email,
      });

      if (!existingUser) {
        throw new GraphQLError("Account not found", {
          extensions: { code: "ACCOUNT_NOT_FOUND" },
        });
      }

      const token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      if (!existingUser.password) {
        return {
          user: existingUser,
          access_token: token,
          isNotHavePassword: true,
        };
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!passwordMatch) {
        throw new GraphQLError("Invalid password", {
          extensions: { code: "INVALID_PASSWORD" },
        });
      }

      return {
        user: existingUser,
        access_token: token,
      };
    },
    signUp: async (_, { input }) => {
      try {
        if (!input.email || !input.password || !input.name) {
          throw new GraphQLError("Invalid input", {
            extensions: { code: "INVALID_INPUT" },
          });
        }

        const existingUser = await User.findOne({
          email: input.email,
        });

        if (existingUser) {
          throw new GraphQLError("Email already exists", {
            extensions: { code: "EMAIL_EXISTS" },
          });
        }

        const hashedPassword = await bcrypt.hash(input.password, 12);

        const newUser = new User({
          name: input.name,
          email: input.email,
          createdAt: new Date(),
          updatedAt: new Date(),
          password: hashedPassword,
        });

        const result = await newUser.save();

        if (!result) {
          throw new GraphQLError("User not created", {
            extensions: { code: "USER_NOT_CREATED" },
          });
        }

        return {
          success: true,
          message: "User created",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    },
  },
  User: {
    id: (parent) => parent.id!,
    orders: async (parent) => {
      try {
        const orders = await Order.find({ userId: parent.id });
        return orders;
      } catch (error) {
        return [];
      }
    },
  },
};

export default resolvers;
