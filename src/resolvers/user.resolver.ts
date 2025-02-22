import User, { IUser } from "../models/user.model";
import generateToken from "../utils/generate.util";
import md5 from "md5";
export const resolverUser = {
  Query: {
    hello: () => "Hello world",
    getListUser: async (_: any, args: any) => {
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
      const users = await User.find(find)
        .sort(sort)
        .skip((currentPage - 1) * limitItems)
        .limit(limitItems);
      return users;
    },
    getUser: async (_: any, args: any, context: any) => {
      const user = await User.findOne({
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
    },
  },
  Mutation: {
    createUser: async (_: any, args: { user: IUser }) => {
      const { user } = args;
      const isUser = await User.findOne({ email: user.email, deleted: false });
      if (isUser) {
        throw new Error("Email đã tồn tại");
      }
      user.password = md5(user.password);
      user.token = generateToken(20);
      const newUser = new User(user);
      await newUser.save();
      return {
        code: 200,
        message: "Tạo tài khoản thành công",
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        token: newUser.token,
        id: newUser._id,
      };
    },
    loginUser: async (_: any, args: { user: IUser }) => {
      const { user } = args;
      const { email, password } = user;
      const isEmail = await User.findOne({ email: email, deleted: false });
      if (!isEmail) {
        throw new Error("Email không tồn tại");
      }
      if (md5(password) !== isEmail.password) {
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
    },
  },
};
