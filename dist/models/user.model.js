"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = new mongoose_1.default.Schema({
    username: String,
    email: String,
    password: String,
    avatar: String,
    token: String,
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("User", User);
