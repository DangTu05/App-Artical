import Article, { IArticle } from "../models/article.model";
export const resolverArticle = {
  Query: {
    hello: () => "Hello world",
    getListArticle: async (_: any, args: any) => {
      const {
        sortKey,
        sortValue,
        currentPage,
        limitItems,
        filterKey,
        filterValue,
        keyword,
      } = args;
      const find: Record<string, any> = {
        deleted: false,
      };
      const sort: Record<string, any> = {};
      if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
      }
      if (filterKey && filterValue) {
        find[filterKey] = filterValue;
      }
      if (keyword) {
        const regex = new RegExp(keyword, "i");
        find["title"] = regex;
      }
      const articles = await Article.find(find)
        .sort(sort)
        .skip((currentPage - 1) * limitItems)
        .limit(limitItems);
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
