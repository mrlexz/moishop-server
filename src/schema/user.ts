import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String
    avatar: String
    orders: [Order]
    createdAt: Date
    updatedAt: Date
    kindeUserId: String
  }
  type AuthUser {
    user: User!
    access_token: String!
  }
  type AuthStatus {
    success: Boolean
    user: User
  }
  input KindeUser {
    id: String
    email: String
    family_name: String
    given_name: String
  }
  input SignUpInput {
    name: String!
    email: String!
    password: String
    avatar: String
  }
  input SignInInput {
    email: String!
    password: String
  }
  input AuthStatusInput {
    user: KindeUser
  }
  extend type Query {
    getAuthStatus(input: AuthStatusInput): AuthStatus
    users: [User]
  }
  extend type Mutation {
    signUp(input: SignUpInput): AuthUser
    signIn(input: SignInInput): AuthUser
  }
`;

export default typeDefs;
