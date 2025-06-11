import express from 'express'
import connectDb from './config/db.js'
import Todos from './model/todoModel.js'
import todoRoute from './routes/todoRoutes.js'

let app = express()
let port = 2004

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api/todo', todoRoute)

app.listen(port, ()=> console.log('Server started'))