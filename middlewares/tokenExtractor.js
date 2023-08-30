const tokenExtractor = (request, response, next)=>{
    const authorization = request.get('authorization')
    // console.log(authorization)
    if (authorization && authorization.startsWith('bearer ')) {
        request.token =  authorization.replace('bearer ', '')
    }else{
        request.token = null
    }

    next()
}

module.exports = tokenExtractor