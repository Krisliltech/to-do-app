"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const indexController_1 = require("../controller/indexController");
const auth_1 = require("../middleware/auth");
router.use(auth_1.auth);
/* GET home page. */
router.post('/add/todo', indexController_1.postTodo);
router.post('/update/:id', indexController_1.updateTodo);
router.get('/delete/:id', indexController_1.deleteTodo);
router.get('/todo', indexController_1.getTodo);
router.get('/:id', indexController_1.getIndividualTodo);
exports.default = router;
