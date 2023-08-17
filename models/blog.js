
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const blogSchema = new mongoose.Schema({
    title: {
      type : String,
      required : true
    },
    author:{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
  },
    url: {
      type: String,
      required: true
  },
    likes: {
      type : Number,
      default : 0
    },
  })

blogSchema.set('toJSON',{
  transform : (doc,ret)=>{
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog