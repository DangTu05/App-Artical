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
exports.resolverUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const generate_util_1 = __importDefault(require("../utils/generate.util"));
const md5_1 = __importDefault(require("md5"));
exports.resolverUser = {
    Query: {
        hello: () => "Hello world",
        getListUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
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
            const users = yield user_model_1.default.find(find)
                .sort(sort)
                .skip((currentPage - 1) * limitItems)
                .limit(limitItems);
            return users;
        }),
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({
                token: context.user.token,
                deleted: false,
            }).select("-password");
            if (!user) {
                throw new Error("Không tìm thấy user");
            }
            return {
                code: 200,
                message: "Lấy thông tin thành công",
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                token: user.token,
                id: user._id,
            };
        }),
    },
    Mutation: {
        createUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const isUser = yield user_model_1.default.findOne({ email: user.email, deleted: false });
            if (isUser) {
                throw new Error("Email đã tồn tại");
            }
            user.password = (0, md5_1.default)(user.password);
            user.token = (0, generate_util_1.default)(20);
            const newUser = new user_model_1.default(user);
            yield newUser.save();
            return {
                code: 200,
                message: "Tạo tài khoản thành công",
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar,
                token: newUser.token,
                id: newUser._id,
            };
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const { email, password } = user;
            const isEmail = yield user_model_1.default.findOne({ email: email, deleted: false });
            if (!isEmail) {
                throw new Error("Email không tồn tại");
            }
            if ((0, md5_1.default)(password) !== isEmail.password) {
                throw new Error("Mật khẩu không chính xác");
            }
            return {
                code: 200,
                message: "Đăng nhập thành công",
                username: isEmail.username,
                email: isEmail.email,
                avatar: isEmail.avatar,
                token: isEmail.token,
                id: isEmail._id,
            };
        }),
    },
};
