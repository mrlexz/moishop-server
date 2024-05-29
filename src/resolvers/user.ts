import User from "./../models/user.model.js";
import Order from "./../models/order.model.js";
import { Resolvers } from "../generated/graphql.js";

const resolvers: Resolvers = {
  Query: {
    users: async (_, __) => {
      const users = await User.find();
      return users;
    },
    getAuthStatus: async (_, { input }) => {
      const user = input?.user;

      if (!user?.id || !user.email) {
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
