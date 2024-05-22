import { Db, ObjectId } from "mongodb";

export default {
  Query: {
    orders: async (_, __, { db }: { db: Db }) => {
      const orders = await db.collection("orders").find().toArray();
      return orders;
    },
    order: async (_, { id }, { db }) => {
      try {
        const order = await db
          .collection("orders")
          .findOne({ _id: new ObjectId(id) });
        if (!order) {
          return null;
        }
        return order;
      } catch (error) {
        return null;
      }
    },
  },
  Mutation: {
    async createOrder(_, { input }, { db }: { db: Db }) {
      try {
        const newInput = {
          ...input,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await db.collection("orders").insertOne(newInput);
        const order = await db
          .collection("orders")
          .findOne({ _id: result.insertedId });
        return { id: order?._id };
      } catch (error) {
        return null;
      }
    },
  },
  Order: {
    id: (parent) => parent._id,
  },
};
