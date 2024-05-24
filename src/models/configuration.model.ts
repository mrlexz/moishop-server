import mongoose from "mongoose";

const configurationModel = new mongoose.Schema(
  {
    width: Number,
    height: Number,
    imgUrl: String,
    croppedImgUrl: String,
    orderStatus: String,
    phoneModel: String,
    caseMaterial: String,
    caseFinish: String,
    caseColor: String,
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
