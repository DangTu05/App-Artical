"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const article_typeDefs_1 = require("./article.typeDefs");
const user_typeDefs_1 = require("./user.typeDefs");
exports.typeDefs = [article_typeDefs_1.typeDefsArticle, user_typeDefs_1.typeDefsUser];
