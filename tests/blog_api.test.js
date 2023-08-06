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

test('there is only one note', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(1)
  })
  
test('the first blog title is g world', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toBe('g world')
  })

test('unique identifier property of the blog posts is named id', async()=>{
  const response = await api.get('/api/blogs')
  console.log(response._body)
  expect(response.body[0].id).toBeDefined()
})


afterAll(async ()=>{
    await mongoose.connection.close
})

