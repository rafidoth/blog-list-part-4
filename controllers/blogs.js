const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
router.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

router.delete('/:id',async (req, res)=>{
    await Blog.findByIdAndDelete(req.params.id);
    res.send("Deleted Successfully")
})

router.put('/:id', async (req,res)=>{
  await Blog.findByIdAndUpdate(req.params.id, req.body, {new:true})
  res.json(req.body)
})

module.exports = router
