import { ObjectId } from "mongodb";
import Configuration from "../models/configuration.model.js";
import { QueryConfigurationArgs, Resolvers } from "../generated/graphql.js";

const resolvers: Resolvers = {
  Query: {
    configurations: async (_, __) => {
      const configurations = await Configuration.find();
      return configurations;
    },
    configuration: async (_, { id }: QueryConfigurationArgs) => {
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
    createConfiguration: async (_, { input }) => {
      try {
        const newInput = {
          ...input,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const newConfiguration = new Configuration(newInput);
        const result = await newConfiguration.save();

        return {
          id: result._id.toString(),
          height: result?.height,
          width: result?.width,
          imgUrl: result?.imgUrl,
          croppedImgUrl: result?.croppedImgUrl,
        };
      } catch (error) {
        return null;
      }
    },
    updateConfiguration: async (_, { input }) => {
      try {
        if (!input?.id) {
          throw Error("id is required");
        }
        const configuration = await Configuration.findOneAndUpdate(
          { _id: new ObjectId(input.id) },
          { $set: input },
          { returnDocument: "after" }
        );

        if (!configuration) {
          return null;
        }
        return {
          id: configuration._id.toString(),
          height: configuration?.height,
          width: configuration?.width,
          imgUrl: configuration?.imgUrl,
          croppedImgUrl: configuration?.croppedImgUrl,
        };
      } catch (error) {
        return null;
      }
    },
  },
  Configuration: {
    id: (parent) => {
      return parent.id!;
    },
  },
};

export default resolvers;
