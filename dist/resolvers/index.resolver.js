"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_resolver_1 = require("./user.resolver");
const article_resolver_1 = require("./article.resolver");
exports.resolvers = [article_resolver_1.resolverArticle, user_resolver_1.resolverUser];
