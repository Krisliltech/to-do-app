"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiValidatelogin = exports.joiValidateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
async function joiValidateSignup(validate) {
    const todoSignupSchema = joi_1.default
        .object({
        name: joi_1.default.string().trim().min(3).max(250).required(),
        password: joi_1.default.string().required(),
        repeat_password: joi_1.default.ref('password'),
        email: joi_1.default
            .string()
            .trim()
            .lowercase()
            .email({ minDomainSegments: 2 })
    })
        .with('password', 'repeat_password');
    const validated = await todoSignupSchema.validate(validate);
    return validated;
}
exports.joiValidateSignup = joiValidateSignup;
async function joiValidatelogin(validate) {
    const todoLoginSchema = joi_1.default.object({
        password: joi_1.default.string().required(),
        email: joi_1.default
            .string()
            .trim()
            .lowercase()
    });
    const validated = await todoLoginSchema.validate(validate, {
        abortEarly: false,
    });
    return validated;
}
exports.joiValidatelogin = joiValidatelogin;
