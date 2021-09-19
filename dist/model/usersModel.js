"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const todoSignupSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Name is needed'],
    },
    email: {
        type: String,
        required: [true, 'Email is needed'],
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, 'Not a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password needed'],
        minlength: 5,
        select: false,
    },
    tokens: [
        {
            token: String,
        },
    ],
});
todoSignupSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await bcryptjs_1.default.hash(this.password, 10);
    next();
});
exports.default = mongoose_1.default.model('todoUsers', todoSignupSchema);
