const mongoose = require('mongoose')
const supertest =  require('supertest')
const app = require('../app')


const api = supertest(app)
test('blogs are returned as json', async ()=>{
    await api
            .get('/api/blogs')
            .expect(200)
            .expect('content-type', /application\/json/)
},100000)

// test('there is only one note', async () => {
//     const response = await api.get('/api/blogs')
//     expect(response.body).toHaveLength(10)
//   })
  
test('the first blog title is g world', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toBe('g world')
  })

test('unique identifier property of the blog posts is named id', async()=>{
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('new blog can be added', async()=>{
  const beforePost = await api.get('/api/blogs')
  const newBlog = {
      title: 'g world',
      author: 'Rafgi',
      url: 'ddgdd.com',
      likes: 876
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type',/application\/json/)
  
  const response = await api.get('/api/blogs')
  const titles = response.body.map(b=>b.title)
  expect(response.body).toHaveLength(beforePost.body.length+1)

  
})


test('if the likes property is missing from the request, it will default to the value 0',async()=>{
  const newBlog = {
    title: 'newblog 1',
    author: 'adsa',
    url: 'ddasd.com',
  }
  const response = await api
      .post('/api/blogs')
      .send(newBlog)
  
  expect(response.body.likes).toBe(0)
  
})

test('if the title or url properties are missing from the request data',async ()=>{
  const newBlog = {
    author: 'adsa'
  }
  await api.post('/api/blogs').send(newBlog).expect(400)

})


afterAll(async ()=>{
    await mongoose.connection.close
})

