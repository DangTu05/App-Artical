/* eslint-disable no-console */
import mongoose from "mongoose";
import env from "../config/environment.config";
async function connect(): Promise<void> {
  try {
    await mongoose.connect(env.MONGO_URL as string);
    // "mongodb://127.0.0.1:27017/Prj_Products"
    console.log("connect sucessfully!!!");
  } catch {
    console.log("connect failue!!!");
  }
}
export { connect };
