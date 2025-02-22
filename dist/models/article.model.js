"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Article = new mongoose_1.default.Schema({
    title: String,
    avatar: String,
    description: String,
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Article", Article);
