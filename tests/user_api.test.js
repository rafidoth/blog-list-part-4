const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')


const supertest =  require('supertest')
const app = require('../app')
const api = supertest(app)


describe('when there is initially one user in db',()=>{
    beforeEach(async ()=>{
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('abcdef',10)
        const user = new User({
            username : 'root',
            name : 'root rahman',
            passwordHash
        })
        await user.save()
    })

    test('adding user successfully',async()=>{
        const usersAtStart = await helper.usersInDB()

        const newUser = {
            username : 'user123',
            name : 'azed',
            password : 'hellobaby'
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDB()

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })


    


})