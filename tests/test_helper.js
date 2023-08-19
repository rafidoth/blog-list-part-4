const User = require('../models/user')
const jwt = require('jsonwebtoken');

const usersInDB = async()=>{
    const users = await User.find({})
    return users.map(u=>u.toJSON())
}

const createTestToken = (userId, username) => {
    const payload = {
      sub: userId,
      username: username
    };
  
    const options = {
      expiresIn: '1h' // Token expiration time
    };
  
    const token = jwt.sign(payload, process.env.SECRET, options);
    return token;
  };

module.exports = {
    usersInDB,
    createTestToken
}