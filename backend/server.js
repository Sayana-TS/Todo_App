import express from 'express'

let app = express()
let port = 2004

app.listen(port, ()=> console.log('Server started'))