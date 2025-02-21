import dotenv from "dotenv";
dotenv.config();
const env = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  /// Khi chạy lện script thì biến này tự được nạp vào process.env
  BUILD_MODE: process.env.BUILD_MODE,
};
export default env;
