import { gql } from "apollo-server-express";
import { IUser } from "../models/user.model";
export const typeDefsUser = gql`
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
    getUser(id: String): IUser
  }
  input UserInput {
    avatar: String
    password: String
    email: String
    username: String
  }
  type Mutation {
    createUser(user: UserInput): IUser
    deleteUser(id: String): String
    updateUser(id: String, user: UserInput): IUser
  }
`;
