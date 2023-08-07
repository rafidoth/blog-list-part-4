const errorHandling = (err,req,res,next)=>{
    if(err.name ==='ValidationError'){
        res.status(400).send('Validation Error')
    }else{
        res.status(500).send('Internal Error')
    }
}

module.exports = errorHandling