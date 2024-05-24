import { Db, ObjectId } from "mongodb";
import Configuration from "../models/configuration.model.js";

export default {
  Query: {
    configurations: async (_, __) => {
      const configurations = await Configuration.find();
      return configurations;
    },
    configuration: async (_, { id }) => {
      try {
        const configuration = await Configuration.findOne({
          _id: new ObjectId(id),
        });
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
    async createConfiguration(_, { input }) {
      try {
        const newInput = {
          ...input,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const newOrder = new Configuration(newInput);
        const result = await newOrder.save();

        return { id: result._id };
      } catch (error) {
        return null;
      }
    },
    async updateConfiguration(_, { input }) {
      try {
        const { id, ...update } = input;
        if (!id) {
          throw Error("id is required");
        }
        const configuration = await Configuration.findOneAndUpdate(
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
