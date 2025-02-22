import { create } from "domain";
import Article, { IArticle } from "./models/article.model";
export const resolvers = {
  Query: {
    hello: () => "Hello world",
    getListArticle: async () => {
      const articles = await Article.find({
        deleted: false,
      });
      return articles;
    },
  },
  Mutation: {
    createArticle: async (_: any, args: { article: IArticle }) => {
      const { article } = args;
      const newArticle = new Article(article);
      await newArticle.save();
      return newArticle;
    },
    deleteArticle: async (_: any, args: any): Promise<string> => {
      const { id } = args;
      await Article.updateOne(
        { _id: id },
        { deleted: true, deletedAt: new Date() }
      );
      return "Đã xóa";
    },
    updateArticle: async (_: any, args: any) => {
      const { id, article } = args;
      await Article.updateOne({ _id: id }, article);
      const record = await Article.findOne({ _id: id });
      return record;
    },
  },
};
