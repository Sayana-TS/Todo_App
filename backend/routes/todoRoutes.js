import express from 'express'
import { createTodo, deleteTodo, getTodo, getTodoById, updateTodo } from '../controllers/todoController.js'

const todoRoute = express.Router()

todoRoute.post('/create-todo', createTodo)
todoRoute.get('/getTodos', getTodo)
todoRoute.delete('/:id', deleteTodo)
todoRoute.patch('/update', updateTodo)
todoRoute.get('/getTodoById', getTodoById)

export default todoRoute