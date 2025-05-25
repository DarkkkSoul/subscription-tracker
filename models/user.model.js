import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Enter a Name'],
      trim: true,
      minLength: 5,
      maxLength: 12,
   },
   password: {
      type: String,
      required: [true, 'Enter a password'],
      minLength: 5,
      maxLength: 12,
   },
   email: {
      type: String,
      required: [true, 'Enter a email'],
      minLength: 5,
      maxLength: 12,
      lowercase: true,
      trim: true,
      unique: true,
   },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
