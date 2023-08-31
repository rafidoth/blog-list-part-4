const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userExtractor= async(req,res,next)=>{
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const id = decodedToken.id
    console.log("User Extractor : ",id)
    if (!id) {
        return req.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(id)
    req.user = user
    console.log("from user Extractor Middleware",user)
    next()
}

module.exports= userExtractor