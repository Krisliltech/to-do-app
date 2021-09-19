import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import todoUsers from "../model/usersModel";


const secret: string = process.env.ACCESS_TOKEN_SECRET as string;

export async function auth(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.cookies.jwt;
        const decoded: any = jwt.verify(token, secret);
        const User = await todoUsers.findOne({ _id: decoded.id, "tokens.token": token });
        if (!User) {
            throw new Error("Thrown here");
        }
        req.token = token;
        req.user = User;
        next();
    } catch (err) {
        res.redirect(401,'/login')
    }
}
