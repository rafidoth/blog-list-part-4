const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogs = require('./controllers/blogs')
const {mongoUrl, PORT} = require('./utils/config')
const {logger} = require('./utils/logger')
// console.log(mongoUrl)
mongoose.connect(mongoUrl)
    .then(()=>logger("database connected"))
    .catch((err)=> logger("Error connecting the database",err))

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogs)


module.exports = app