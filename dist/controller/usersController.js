"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogout = exports.getLogin = exports.getSignup = exports.postLogin = exports.postSignup = void 0;
const usersModel_1 = __importDefault(require("../model/usersModel"));
const joiSchema_1 = require("../middleware/joiSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//////////////////// JWT //////////////////
const secret = process.env.ACCESS_TOKEN_SECRET;
const days = process.env.ACCESS_EXPIRES;
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, secret, {
        expiresIn: days,
    });
};
async function postSignup(req, res, next) {
    try {
        const { error } = await (0, joiSchema_1.joiValidateSignup)(req.body);
        if (error) {
            res.status(302).redirect('/');
            return;
        }
        const newUsers = await usersModel_1.default.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        const token = signToken(newUsers._id);
        res.cookie('jwt', token, { httpOnly: true });
        res.status(302).redirect('/login');
    }
    catch (err) {
        res.status(404).redirect('/');
        return;
    }
}
exports.postSignup = postSignup;
async function postLogin(req, res, next) {
    const { email } = req.body;
    try {
        const { error } = await (0, joiSchema_1.joiValidatelogin)(req.body);
        if (error) {
            res.status(302).redirect('/login');
            return;
        }
        const users = await usersModel_1.default.findOne({ email }).select('+password');
        const validUser = await bcryptjs_1.default.compare(req.body.password, users.password);
        if (validUser) {
            const token = signToken(users._id);
            users.tokens = users.tokens.concat({ token });
            await users.save();
            res.cookie('jwt', token, { httpOnly: true });
            res.status(302).redirect('/todo');
        }
        else {
            res.status(302).redirect('/login');
        }
    }
    catch (err) {
        res.status(404).redirect('/login');
        return;
    }
}
exports.postLogin = postLogin;
async function getSignup(req, res, next) {
    try {
        res.status(200).render('signup');
    }
    catch (err) {
        res.send(err);
    }
}
exports.getSignup = getSignup;
async function getLogin(req, res, next) {
    try {
        res.status(200).render('login');
    }
    catch (err) {
        res.send(err);
    }
}
exports.getLogin = getLogin;
async function getLogout(req, res) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(302).redirect('/login');
    }
    catch (err) {
        res.send(err);
    }
}
exports.getLogout = getLogout;
