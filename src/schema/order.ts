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
  type CreateCheckoutSessionOutput {
    order: Order
    url: String
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
    amount: Float!
    kindeUserId: ID
  }
  type PaymentStatusOutput {
    order: Order
    status: Boolean
  }
  extend type Query {
    orders: [Order]
    order(id: ID!): Order
    paymentStatus(orderId: ID!): PaymentStatusOutput
  }
  extend type Mutation {
    createCheckoutSession(input: CreateOrderInput): CreateCheckoutSessionOutput
  }
`;
export default typeDefs;
