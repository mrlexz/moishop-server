import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
  }
  type Review {
    id: ID!
    rating: Int!
    comment: String!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
  }
  extend type Query {
    games: [Game]
    reviews: [Review]
    authors: [Author]
    review(id: ID!): Review
  }
`;

export default typeDefs;
