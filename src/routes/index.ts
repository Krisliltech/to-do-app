import express from 'express';
const router = express.Router();
import {getTodo, getIndividualTodo, postTodo, updateTodo, deleteTodo} from "../controller/indexController"
import { auth } from "../middleware/auth"

router.use(auth)

/* GET home page. */
router.post('/add/todo', postTodo);

router.post('/update/:id', updateTodo);

router.get('/delete/:id', deleteTodo);

router.get('/todo', getTodo);

router.get('/:id', getIndividualTodo);

export default router;
