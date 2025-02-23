"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsUser = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsUser = (0, apollo_server_express_1.gql) `
  type IUser {
    id: String
    avatar: String
    password: String
    email: String
    username: String
    code: Int
    message: String
    token: String
  }
  type Query {
    hello: String
    getListUser(
      sortKey: String
      sortValue: String
      currentPage: Int = 1
      limitItems: Int = 5
      filterKey: String
      filterValue: String
      keyword: String
    ): [IUser]
    getUser: IUser
  }
  input RegisterUserInput {
    avatar: String
    password: String
    email: String
    username: String
  }
  input LoginUserInput {
    email: String
    password: String
  }
  type Mutation {
    createUser(user: RegisterUserInput): IUser
    loginUser(user: LoginUserInput): IUser
    updateUser(id: String, user: RegisterUserInput): IUser
  }
`;
