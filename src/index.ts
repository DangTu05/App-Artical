/* eslint-disable no-console */
import express, { Express, Request, Response } from "express";
import { connect } from "./config/database.config";
import env from "./config/environment.config";
const app: Express = express();
const port: number = parseInt(env.PORT as string);
const startServer = (): void => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};
/// anonymous async function(IIFE)
(async (): Promise<void> => {
  try {
    console.log("Connecting to database...");
    /// Kết nối db, chỉ khi thành công mới chạy server
    await connect();
    startServer();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
