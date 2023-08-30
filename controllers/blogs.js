const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')
// const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   // console.log(authorization)
//   if (authorization && authorization.startsWith('bearer ')) {
//     return authorization.replace('bearer ', '')
//   }
//   return null
// }

router.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('author',{username :1,name:1})
    response.json(blogs)
  })
  
router.post('/', async (request, response) => {
  const body  = request.body;
  const userId = request.user._id.toString();
  const user = await User.findById(userId)

  const newBlog = {
    title : body.title,
    author : user.id,
    url : body.url,
    likes : body.likes
  }
  const blog = new Blog(newBlog)
  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()
  response.status(201).json(result)
})

router.delete('/:id',async (req, res)=>{

    const userId = req.user._id.toString();
    const blog = await Blog.findById(req.params.id);
    if(blog.author.toString() === userId){
        await Blog.findByIdAndDelete(blog.id.toString())
    }
    res.send("Deleted Successfully")
})

router.put('/:id', async (req,res)=>{
  await Blog.findByIdAndUpdate(req.params.id, req.body, {new:true})
  res.json(req.body)
})

module.exports = router
