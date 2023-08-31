const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest =  require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const {createTestToken} = require('./test_helper')
const api = supertest(app)




describe('blog test', ()=>{
  let testToken;
  beforeEach(async ()=>{
    //deleting all existing data in db
    await Blog.deleteMany({})
    await User.deleteMany({})

    // Creating a new user for testing
    const passwordHash = await bcrypt.hash('abcdef',10)
    const user = new User({
      username : 'root',
      name : 'root rahman',
      passwordHash
    })
    await user.save()

    //getting all users list
    const response = await api.get('/api/users')
    const users = response.body
    console.log(users)


    //Login to the application using the user just created above
    const testUsername = 'root';
    const loginBody = {
      username : testUsername,
      password : 'abcdef'
    }
    const loginRes = await api.post('/api/login').send(loginBody)
    testToken = loginRes.body.token;

    //creating a new blog
    const newBlog = new Blog({
        title : "first blog",
        author : users[0].id,
        url : 'test.com',
        likes : 5
    })
    await newBlog.save()
  })
  test('blogs are returned as json', async ()=>{
      await api
          .get('/api/blogs')
          .set('Authorization', `bearer ${testToken}`)
          .expect(200)
          .expect('content-type', /application\/json/)
  },100000)

  test('there is only one blog', async () => {
      const response = await api.get('/api/blogs').set('Authorization', `bearer ${testToken}`)
      expect(response.body).toHaveLength(1)
    })
    
  test('the first blog title is first blog', async () => {
      const response = await api.get('/api/blogs').set('Authorization', `bearer ${testToken}`)
      expect(response.body[0].title).toBe('first blog')
    })

  test('unique identifier property of the blog posts is named id', async()=>{
    const response = await api.get('/api/blogs').set('Authorization', `bearer ${testToken}`)
    expect(response.body[0].id).toBeDefined()
  })

  test('new blog can be added', async()=>{
    const response = await api.get('/api/blogs').set('Authorization', `bearer ${testToken}`)
    const blogsAtStart = response.body;
    // console.log(blogsAtStart)
    const usersResponse = await api.get('/api/users')
    const users = usersResponse.body
    const newBlog = {
        title: 'g world',
        author: users[0].id,
        url: 'ddgdd.com',
        likes: 876
    }
    
    await api
      .post('/api/blogs').set('Authorization', `bearer ${testToken}`)
      .set('authorization', `bearer ${testToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-type',/application\/json/)
    
    const blogsAtEnd = await api.get('/api/blogs').set('Authorization', `bearer ${testToken}`)
    // console.log(blogsAtEnd.body)
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.length+1)
  })


  test('if the likes property is missing from the request, it will default to the value 0',async()=>{
    const newBlog = {
      title: 'newblog 1',
      author: 'adsa',
      url: 'ddasd.com',
    }
    const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${testToken}`)
        .send(newBlog)
    
    expect(response.body.likes).toBe(0)
    
  })



  test('delete route works or not', async()=>{
    const initial = await api.get('/api/blogs').set('Authorization', `bearer ${testToken}`)
    await api.delete(`/api/blogs/${initial.body[0].id}`).set('Authorization', `bearer ${testToken}`)
    const res = await api.get('/api/blogs').set('Authorization', `bearer ${testToken}`)
    expect(res.body.length).toBe(initial.body.length-1)
  })

  afterAll(async ()=>{
      await mongoose.connection.close()
  })

})

