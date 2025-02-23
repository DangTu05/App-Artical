"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = require("./config/database.config");
const environment_config_1 = __importDefault(require("./config/environment.config"));
const apollo_server_express_1 = require("apollo-server-express");
const index_resolver_1 = require("./resolvers/index.resolver");
const index_typeDefs_1 = require("./typeDefs/index.typeDefs");
const auth_middleware_1 = require("./middleware/auth.middleware");
const app = (0, express_1.default)();
const port = parseInt(environment_config_1.default.PORT);
const startServer = () => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("/graphql", auth_middleware_1.reqAuth);
    try {
        const apolloServer = new apollo_server_express_1.ApolloServer({
            typeDefs: index_typeDefs_1.typeDefs,
            resolvers: index_resolver_1.resolvers,
            introspection: true,
            context: ({ req }) => (Object.assign({}, req)),
        });
        yield apolloServer.start();
        apolloServer.applyMiddleware({ app: app, path: "/graphql" });
        console.log("Connecting to database...");
        yield (0, database_config_1.connect)();
        startServer();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}))();
