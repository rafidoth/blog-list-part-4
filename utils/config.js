require('dotenv').config()
const mongoUrl = process.env.NODE_ENV==='test'? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
console.log(mongoUrl)
const PORT = process.env.PORT
module.exports = {mongoUrl, PORT}