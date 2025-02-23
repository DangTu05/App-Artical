"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsArticle = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsArticle = (0, apollo_server_express_1.gql) `
  type Article {
    id: String
    title: String
    avatar: String
    description: String
    deleted: Boolean
    deletedAt: String
  }
  type Query {
    hello: String
    getListArticle(
      sortKey: String
      sortValue: String
      currentPage: Int = 1
      limitItems: Int = 5
      filterKey: String
      filterValue: String,
      keyword: String
    ): [Article]
    getArticle(id: String): Article
  }
  input ArticleInput {
    title: String
    avatar: String
    description: String
  }
  type Mutation {
    createArticle(article: ArticleInput): Article
    deleteArticle(id: String): String
    updateArticle(id: String, article: ArticleInput): Article
  }
`;
