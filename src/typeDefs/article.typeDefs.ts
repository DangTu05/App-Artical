import { gql } from "apollo-server-express";
export const typeDefsArticle = gql`
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
