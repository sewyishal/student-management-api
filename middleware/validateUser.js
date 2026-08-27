const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateUser=(req,res,next)=>{
    if(!req.body.username){
        return res.status(400).json({
            success: false,
            message:"username is required "
        })
    }
    if(!req.body.email){
        return res.status(400).json({
            success: false,
            message:"Email is required"
        })
    }
    if(!emailPattern.test(req.body.email)){
        return res.status(400).json({
            success: false,
            message:"Email format is not correct"
        })
    }
    
    if(!req.body.password){
        return res.status(400).json({
            success: false,
            message:"Password is required"
        })
    }
    next()
}
module.exports= validateUser;