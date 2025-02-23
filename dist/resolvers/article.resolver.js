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
exports.resolverArticle = void 0;
const article_model_1 = __importDefault(require("../models/article.model"));
exports.resolverArticle = {
    Query: {
        hello: () => "Hello world",
        getListArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { sortKey, sortValue, currentPage, limitItems, filterKey, filterValue, keyword, } = args;
            const find = {
                deleted: false,
            };
            const sort = {};
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
            const articles = yield article_model_1.default.find(find)
                .sort(sort)
                .skip((currentPage - 1) * limitItems)
                .limit(limitItems);
            return articles;
        }),
    },
    Mutation: {
        createArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { article } = args;
            const newArticle = new article_model_1.default(article);
            yield newArticle.save();
            return newArticle;
        }),
        deleteArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            yield article_model_1.default.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });
            return "Đã xóa";
        }),
        updateArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, article } = args;
            yield article_model_1.default.updateOne({ _id: id }, article);
            const record = yield article_model_1.default.findOne({ _id: id });
            return record;
        }),
    },
};
