import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

const authorize = async (req, res, next) => {
   try {
      let token;

      // check if token is available in the header

      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
         // extract the token by splitting brearer and getting the second part

         // Header = {
         //    Authorization: 'Bearer <token>'
         // }

         token = req.headers.authorization.split(' ')[1];
      }

      // Checking if token is available
      if (!token) {
         const error = new Error('No Token Found - Unauthorized');
         error.statusCode = 401;
         throw error;
      }

      // Checking if token is valid
      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(decoded.userId);

      if (!user) {
         const error = new Error('User not found');
         error.statusCode = 404;
         throw error;
      }

      req.user = user;
      next();

   } catch (error) {
      next(error);
   }
}

export default authorize;