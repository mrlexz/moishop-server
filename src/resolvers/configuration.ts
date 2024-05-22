import { Db, ObjectId } from "mongodb";

export default {
  Query: {
    configurations: async (_, __, { db }) => {
      const configurations = await db
        .collection("configurations")
        .find()
        .toArray();
      return configurations;
    },
    configuration: async (_, { id }, { db }) => {
      try {
        const configuration = await db
          .collection("configurations")
          .findOne({ _id: new ObjectId(id) });
        if (!configuration) {
          return null;
        }
        return configuration;
      } catch (error) {
        return null;
      }
    },
  },
  Mutation: {
    async createConfiguration(_, { input }, { db }) {
      try {
        const newInput = {
          ...input,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await db
          .collection("configurations")
          .insertOne(newInput);
        const configuration = await db
          .collection("configurations")
          .findOne({ _id: result.insertedId });
        return { id: configuration._id };
      } catch (error) {
        return null;
      }
    },
    async updateConfiguration(_, { input }, { db }: { db: Db }) {
      try {
        const { id, ...update } = input;
        if (!id) {
          throw Error("id is required");
        }
        const configuration = await db
          .collection("configurations")
          .findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update },
            { returnDocument: "after" }
          );

        if (!configuration) {
          return null;
        }
        return { ...configuration, id: configuration._id };
      } catch (error) {
        return null;
      }
    },
  },
  Configuration: {
    id: (parent) => parent._id,
  },
};
