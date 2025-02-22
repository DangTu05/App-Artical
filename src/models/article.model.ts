import mongoose, { Schema } from "mongoose";
export interface IArticle extends Document {
  title: string;
  avatar: string;
  description: string;
  deleted?: boolean;
  deletedAt?: Date;
}
const Article = new mongoose.Schema<IArticle>(
  {
    title: String,
    avatar: String,
    description: String,
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IArticle>("Article", Article);
