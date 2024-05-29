import mongoose from "mongoose";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
  OrderStatus,
} from "./../generated/graphql.js";

const configurationModel = new mongoose.Schema(
  {
    width: Number,
    height: Number,
    imgUrl: String,
    croppedImgUrl: String,
    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
    },
    phoneModel: {
      type: String,
      enum: Object.values(PhoneModel),
    },
    caseMaterial: {
      type: String,
      enum: Object.values(CaseMaterial),
    },
    caseFinish: {
      type: String,
      enum: Object.values(CaseFinish),
    },
    caseColor: {
      type: String,
      enum: Object.values(CaseColor),
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

export default mongoose.model("Configuration", configurationModel);
