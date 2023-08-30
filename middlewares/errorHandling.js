const errorHandling = (err,req,res,next)=>{
    if(err.name ==='ValidationError'){
        res.status(400).send('Validation Error')
    }else if (err.name ===  'JsonWebTokenError') {
        return res.status(401).json({ error: err.message })
    }else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          error: 'token expired'
        })
    }else{
        res.status(500).send('Internal Error dhur')
    }
}

module.exports = errorHandling