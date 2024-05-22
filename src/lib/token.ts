import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const getUserFromToken = (token, db) => {
  try {
    if (!token) {
      return null;
    }
    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      return null;
    }

    return db.collection("users").findOne({ _id: new ObjectId(decoded.id) });
  } catch (error) {
    throw new Error("Invalid token");
  }
};
