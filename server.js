const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Todo = require('./models/todo')


const app = express()
mongoose.connect('mongodb://localhost/rabagirana')
app.use('/', express.static(path.resolve(__dirname, 'static')))

app.use(bodyParser.json())


app.get('/api/todos', async(req,res)=>{
    const records = await Todo.find({})
    res.status(200).json(records)
})

app.post('/api/create', async(req,res)=>{
    const record = req.body
    res.status(200).json({status: 'OK', data: record})
})

app.listen('3001', ()=> {console.log('server running')})