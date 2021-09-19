import express from 'express';
const router = express.Router();
import {postSignup, postLogin, getSignup, getLogin, getLogout } from "../controller/usersController"
import {auth} from "../middleware/auth"


/* GET users listing. */
router.get('/', getSignup)

router.post('/signup', postSignup);

router.get('/login', getLogin);

router.post('/login', postLogin);

router.get('/logout', auth, getLogout);

export default router;
