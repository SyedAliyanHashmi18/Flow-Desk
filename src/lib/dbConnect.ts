import mongoose from "mongoose";

interface MongooseConnection {
  isConnected?: number;
}

// @ts-ignore
const globalWithMongoose = global as typeof globalThis & {
  mongoose: MongooseConnection;
};

globalWithMongoose.mongoose = globalWithMongoose.mongoose || {};

const dbConnect = async () => {
  if (globalWithMongoose.mongoose.isConnected) {
    console.log(" Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    globalWithMongoose.mongoose.isConnected = db.connections[0].readyState;
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    throw err;
  }
};

export default dbConnect;