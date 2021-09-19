"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersModel_1 = __importDefault(require("../model/usersModel"));
const secret = process.env.ACCESS_TOKEN_SECRET;
async function auth(req, res, next) {
    try {
        const token = req.cookies.jwt;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const User = await usersModel_1.default.findOne({ _id: decoded.id, "tokens.token": token });
        if (!User) {
            throw new Error("Thrown here");
        }
        req.token = token;
        req.user = User;
        next();
    }
    catch (err) {
        res.redirect(401, '/login');
    }
}
exports.auth = auth;
