import mongoose, { Schema } from "mongoose";
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  token: string;
  deleted?: boolean;
  deletedAt?: Date;
}
const User = new mongoose.Schema<IUser>(
  {
    username: String,
    email: String,
    password: String,
    avatar: String,
    token: String,
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", User);
