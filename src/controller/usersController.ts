import  express, { Request, Response, NextFunction } from "express";
import todoUsers from "../model/usersModel"
import {joiValidateSignup, joiValidatelogin} from "../middleware/joiSchema"
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";


//////////////////// JWT //////////////////
const secret: string = process.env.ACCESS_TOKEN_SECRET as string;
const days: string =process.env.ACCESS_EXPIRES as string;
const signToken = (id: string) => {
  return jwt.sign({ id }, secret, {
    expiresIn: days,
  });
};

export async function postSignup(req:Request, res:Response, next:NextFunction) {
    try {
        const {error} = await joiValidateSignup(req.body)
        if (error) {
          res.status(302).redirect('/')
          return;
        }
        const newUsers = await todoUsers.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        const token = signToken(newUsers._id);
        res.cookie('jwt', token, { httpOnly: true });
        res.status(302).redirect('/login')

    } catch (err: any) {
        res.status(404).redirect('/')
        return;
    }
}

export async function postLogin(req:Request, res:Response, next:NextFunction) {
    const { email } = req.body;
  try {
        const {error} = await joiValidatelogin(req.body)
        if (error) {
            res.status(302).redirect('/login')
            return;
        }
        const users = await todoUsers.findOne({ email }).select('+password');
        const validUser = await bcrypt.compare(req.body.password , users.password);
        if(validUser){
            const token = signToken(users._id);
            users.tokens = users.tokens.concat({ token });
            await users.save();
            res.cookie('jwt', token, { httpOnly: true });
    
            res.status(302).redirect('/todo')
        }else{
            res.status(302).redirect('/login')
        }

    } catch (err: any) {
        res.status(404).redirect('/login')
       return;
    }
}

export async function getSignup (req:Request, res:Response, next:NextFunction) {
    try {
        res.status(200).render('signup');
    }catch(err){
        res.send(err)
    }
}

export async function getLogin (req:Request, res:Response, next:NextFunction) {
    try {
        res.status(200).render('login');
    }catch(err){
        res.send(err)
    }
}

export async function getLogout(req: any, res: Response): Promise<void> {
    try{
        req.user.tokens = req.user.tokens.filter(
        (token: { [key: string]: string }) => {
        return token.token !== req.token;
        });
        await req.user.save();
        res.status(302).redirect('/login')
    }catch(err){
        res.send(err)
    }
}