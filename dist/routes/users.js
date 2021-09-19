"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const usersController_1 = require("../controller/usersController");
const auth_1 = require("../middleware/auth");
/* GET users listing. */
router.get('/', usersController_1.getSignup);
router.post('/signup', usersController_1.postSignup);
router.get('/login', usersController_1.getLogin);
router.post('/login', usersController_1.postLogin);
router.get('/logout', auth_1.auth, usersController_1.getLogout);
exports.default = router;
