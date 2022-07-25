//@ts-nocheck
import mongoose from "mongoose";
require("mongoose-type-url");

const userSchema = {
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: "Email is required!",
  },
  userName: {
    type: String,
    lowercase: true,
    required: "UserName is required!",
    unique: true
  },
  isEmailVerified: {
    type: Boolean,
    required: true,
    default: false
  }
};

const UserSchema = new mongoose.Schema(userSchema, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;
