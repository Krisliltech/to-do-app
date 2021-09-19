import express, { Request, Response, NextFunction} from "express"

const todo = require('../model/indexModel').default

export async function postTodo(req:any, res:Response, next:NextFunction){
    try {   
                   const { details } = req.body;
                   const userData= new todo({
                       user: req.user._id,
                      details
                    });
                   await userData.save()
                   res.status(201).redirect('/todo')
    }catch(err){
        res.status(404).redirect('/todo')
    }
}

export async function updateTodo (req:Request, res:Response, next:NextFunction) {  
    try {
            const { details } = req.body;   
           await todo.findOneAndUpdate({"_id": req.params.id}, { "$set": { "details":details}}).exec(function(err:Error, det:{}){
                if(err){
                    res.status(500).send(err)         
                }else{
                    res.status(201).redirect('/todo')
                }
           })
    }catch(err){
        res.status(404).redirect('/todo')
    }
}
export async function deleteTodo (req:Request, res:Response, next:NextFunction) {
    try{   
        await todo.deleteOne({ "_id": req.params.id });
        res.status(200).redirect('/todo')
    }catch(err){
        res.status(404).redirect('/todo')
    }
}

export async function getTodo (req:any, res:Response, next:NextFunction) {
    try {
        const tod = await todo.find({user: req.user._id})
        res.status(200).render('index', {  'tod' : tod });
    }catch(err){
        res.status(404).send(err);
    }
}

export async function getIndividualTodo (req:Request, res:Response, next:NextFunction) {
    try {
        const tod = await todo.findOne({"-id":req.params.id})
        res.status(200).render('index', { "title": "tod"});
    }catch(err){
        res.status(404).send(err)
    }
}

