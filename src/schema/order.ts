import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum OrderStatus {
    fullfilled
    shipped
    awaiting_shipment
  }
  type Order {
    id: ID
    configurationId: ID
    configuration: Configuration
    userId: ID
    user: User
    amount: Float
    isPaid: Boolean
    orderStatus: OrderStatus
    createdAt: Date
    updatedAt: Date
    shippingAddress: ShippingAddress
    shippingAddressId: ID
    billingAddress: BillingAddress
    billingAddressId: ID
  }
  type ShippingAddress {
    id: ID
    order: Order
    orderId: ID
    name: String
    street: String
    city: String
    postalCode: String
    country: String
    state: String
    phoneNumber: String
    createdAt: Date
    updatedAt: Date
    orders: [Order]
  }
  type BillingAddress {
    id: ID
    order: Order
    orderId: ID
    name: String
    street: String
    city: String
    postalCode: String
    country: String
    state: String
    phoneNumber: String
    createdAt: Date
    updatedAt: Date
    orders: [Order]
  }
  input CreateOrderInput {
    configurationId: ID!
    userId: ID!
    amount: Float!
    isPaid: Boolean!
    orderStatus: OrderStatus
  }
  extend type Query {
    orders: [Order]
    order(id: ID!): Order
  }
  extend type Mutation {
    createOrder(input: CreateOrderInput): Order
  }
`;
export default typeDefs;
