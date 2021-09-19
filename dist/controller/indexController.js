"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndividualTodo = exports.getTodo = exports.deleteTodo = exports.updateTodo = exports.postTodo = void 0;
const todo = require('../model/indexModel').default;
async function postTodo(req, res, next) {
    try {
        const { details } = req.body;
        const userData = new todo({
            user: req.user._id,
            details
        });
        await userData.save();
        res.status(201).redirect('/todo');
    }
    catch (err) {
        res.status(404).redirect('/todo');
    }
}
exports.postTodo = postTodo;
async function updateTodo(req, res, next) {
    try {
        const { details } = req.body;
        await todo.findOneAndUpdate({ "_id": req.params.id }, { "$set": { "details": details } }).exec(function (err, det) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(201).redirect('/todo');
            }
        });
    }
    catch (err) {
        res.status(404).redirect('/todo');
    }
}
exports.updateTodo = updateTodo;
async function deleteTodo(req, res, next) {
    try {
        await todo.deleteOne({ "_id": req.params.id });
        res.status(200).redirect('/todo');
    }
    catch (err) {
        res.status(404).redirect('/todo');
    }
}
exports.deleteTodo = deleteTodo;
async function getTodo(req, res, next) {
    try {
        const tod = await todo.find({ user: req.user._id });
        res.status(200).render('index', { 'tod': tod });
    }
    catch (err) {
        res.status(404).send(err);
    }
}
exports.getTodo = getTodo;
async function getIndividualTodo(req, res, next) {
    try {
        const tod = await todo.findOne({ "-id": req.params.id });
        res.status(200).render('index', { "title": "tod" });
    }
    catch (err) {
        res.status(404).send(err);
    }
}
exports.getIndividualTodo = getIndividualTodo;
