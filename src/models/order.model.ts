import mongoose from "mongoose";
import { OrderStatus } from "./../generated/graphql.js";

const orderModel = new mongoose.Schema(
  {
    configurationId: {
      type: String,
      ref: "Configuration",
    },
    userId: {
      type: String,
      ref: "User",
    },
    amount: Number,
    isPaid: Boolean,
    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
    },
    shippingAddressId: {
      type: String,
      ref: "ShippingAddress",
    },
    billingAddressId: {
      type: String,
      ref: "BillingAddress",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderModel);
