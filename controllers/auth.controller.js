import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { JWT_EXPIRY, JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {

   const mongooseSession = await mongoose.startSession();
   mongooseSession.startTransaction();

   try {

      const { name, email, password } = req.body;

      // checking if user is already existing
      const isUserExist = await User.findOne({ email });
      if (isUserExist) {
         const error = new Error('User Already exists');
         error.statusCode = 409;
         throw error;
      }

      // if not then ->
      // 1. hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // 2. create the user
      const newUsers = await User.create([{ name, email, password: hashPassword }], { session: mongooseSession });

      // 3. gen token for that user
      const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

      await mongooseSession.commitTransaction();
      mongooseSession.endSession();

      // 4. then return the information in json format.
      res.status(201).json({
         success: true,
         message: 'User Created Successfully',
         data: {
            token,
            user: newUsers[0],
         }
      })

   } catch (error) {
      await mongooseSession.abortTransaction();
      mongooseSession.endSession();
      next(error);
   }
};

export const signIn = async (req, res, next) => { }

export const signOut = async (req, res, next) => { }