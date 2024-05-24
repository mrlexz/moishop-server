import { comparePassword, hashPassword } from "../lib/password.js";
import { generateToken } from "../lib/token.js";
import User from "./../models/user.model.js";
import Order from "./../models/order.model.js";

export default {
  Query: {
    async users(_, __) {
      const users = await User.find();
      return users;
    },
    async getAuthStatus(_, { input }, { db }) {
      const { user } = input;

      if (!user.id || !user.email) {
        throw new Error("Invalid user input");
      }

      const existingUser = await User.findOne({
        kindeUserId: user.id,
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

        return {
          success: true,
          user: userResult,
        };
      }

      return {
        success: true,
        user: existingUser,
      };
    },
  },
  Mutation: {
    async signUp(_, { input }, { db }) {
      try {
        const hashedPassword = await hashPassword(input.password);

        const newUser = {
          ...input,
          password: hashedPassword,
        };
        const result = await db.collection("users").insertOne(newUser);
        const user = await db
          .collection("users")
          .findOne({ _id: result.insertedId });

        const token = generateToken(user);

        return {
          user,
          access_token: token,
        };
      } catch (error) {
        console.log("🚀 ~ signUp ~ error:", error);
        return null;
      }
    },
    async signIn(_, { input }, { db }) {
      const user = await db.collection("users").findOne({ email: input.email });

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await comparePassword(
        input.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const token = generateToken(user);

      return {
        user,
        access_token: token,
      };
    },
  },
  User: {
    id: (parent) => parent._id,
    orders: async (parent, _, { db }) => {
      try {
        const orders = await Order.find({ userId: parent._id });
        return orders;
      } catch (error) {
        return [];
      }
    },
  },
};
