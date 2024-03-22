"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogEditInput = exports.blogInput = exports.signinInput = exports.singupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.singupInput = zod_1.default.object({
    username: zod_1.default.string().min(3),
    password: zod_1.default.string().min(3),
    name: zod_1.default.string().optional()
});
exports.signinInput = zod_1.default.object({
    username: zod_1.default.string().min(3),
    password: zod_1.default.string().min(3)
});
exports.blogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.blogEditInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.number()
});
const res = exports.signinInput.safeParse({
    username: 'sa',
    password: 'sai@123',
    name: 'sathvik'
});
console.log(res);
