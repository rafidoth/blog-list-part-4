const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogs = require('./controllers/blogs')
const {mongoUrl, PORT} = require('./utils/config')
const {logger} = require('./utils/logger')

mongoose.connect(mongoUrl)
    .then(()=>logger("database connected"))
    .catch((err)=> logger("Error connecting the database",err))

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogs)



app.listen(PORT, () => {
  logger(`Server running on port ${PORT}`)
})