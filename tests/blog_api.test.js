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

test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    console.log(response.body)
    expect(response.body).toHaveLength(2)
  })
  
test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')
  
    expect(response.body[0].content).toBe('HTML is easy')
  })

afterAll(async ()=>{
    await mongoose.connection.close
})

