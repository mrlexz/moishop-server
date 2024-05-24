import mongoose from "mongoose";

const billingAddressModel = new mongoose.Schema(
  {
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    name: String,
    street: String,
    city: String,
    postalCode: String,
    country: String,
    state: String,
    phoneNumber: String,
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

export default mongoose.model("BillingAddress", billingAddressModel);
