"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    DATABASE_NAME: process.env.DATABASE_NAME,
    BUILD_MODE: process.env.BUILD_MODE,
};
exports.default = env;
