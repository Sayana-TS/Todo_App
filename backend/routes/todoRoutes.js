import express from 'express'
import { createTodo, deleteTodo, getTodo } from '../controllers/todoController.js'

const todoRoute = express.Router()

todoRoute.post('/create-todo', createTodo)
todoRoute.get('/getTodos', getTodo)
todoRoute.delete('/:id', deleteTodo)

export default todoRoute