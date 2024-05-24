import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URI!, {
      dbName: process.env.DB_NAME,
    });
    console.log(
      "👉 Pinged your deployment. You successfully connected to MongoDB! 👈",
      connect.connection.host
    );
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error);
    process.exit(1);
  }
};
