import mongoose from "mongoose";
import user from "src/resolvers/user.js";

const orderModel = new mongoose.Schema(
  {
    configurationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Configuration",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: Number,
    isPaid: Boolean,
    orderStatus: String,
    shippingAddressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingAddress",
    },
    billingAddressId: {
      type: mongoose.Schema.Types.ObjectId,
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
