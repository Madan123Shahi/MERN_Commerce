import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // console.log(process.env.MONGO_URI);
    if (!process.env.MONGO_URI) {
      throw new Error(`Environment variable is not set for MONGO`);
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected", process.env.MONGO_URI);
  } catch (error) {
    console.log("MongoDB Connect Error", error);
    process.exit(1);
  }
};
