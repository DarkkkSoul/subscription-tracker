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

export const signIn = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      // check is user not found
      if (!user) {
         const error = new Error("User Not Found");
         error.statusCode = 404;
         throw error;
      }

      // if found then
      // 1. compare password
      const isPassValid = await bcrypt.compare(password, user.password);

      // 2. check if password is wrong
      if (isPassValid) {
         const error = new Error('Incorrect Password');
         error.statusCode = 401;
         throw error;
      }

      // 3. create token if password is correct
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

      // 4. return json and status code
      res.status(200).json({
         success: true,
         message: 'User Found - Signed in Successfully',
         data: {
            token,
            user,
         }
      })

   } catch (error) {
      next(error);
   }
}

export const signOut = async (req, res, next) => { }