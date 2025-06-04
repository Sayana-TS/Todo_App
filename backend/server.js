import express from 'express'
import connectDb from './config/db.js'

let app = express()
let port = 2004

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get('/', (req,res)=>{
    res.send('hai worked')
})

app.get('/user', (req,res)=>{
    res.send('user response')
})

app.listen(port, ()=> console.log('Server started'))