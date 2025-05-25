import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from '../config/env.js';


if (!DB_URI) {
   throw new Error("Add MONGODB_URI environment variable");
}

const connectDB = async () => {
   try {
      await mongoose.connect(DB_URI);
      console.log(`DB CONNECTED!! In ${NODE_ENV} mode`);
   } catch (error) {
      console.log('Error connecting to DB:', error);
      process.exit(1);
   }
}

export default connectDB;
