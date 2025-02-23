/* eslint-disable no-console */
import express from "express";
import { connect } from "./config/database.config";
import env from "./config/environment.config";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers/index.resolver";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { reqAuth } from "./middleware/auth.middleware";
const app = express() as any;
const port: number = parseInt(env.PORT as string);
const startServer = (): void => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};
/// anonymous async function(IIFE)
(async (): Promise<void> => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/graphql", reqAuth);
  try {
    ///graphQl
    const apolloServer = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers,
      introspection: true,
      context: ({ req }) => ({ ...req }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app, path: "/graphql" });
    console.log("Connecting to database...");
    /// Kết nối db, chỉ khi thành công mới chạy server
    await connect();
    startServer();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
