import mongoose from "mongoose";
import { buffer } from "stream/consumers";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;
// global.mongoose is a global variable that is used to store the mongoose connection
// we defined it in types.d.ts file
// check if cached is not defined then define it
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10
    };
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection)
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}
