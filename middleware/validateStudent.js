const validateStudent =(req,res,next)=>{
    if(!req.body.student_name){
        return res.status(400).json({
            success: false,
            message:"Student name field empty"
        })
    }else{
         next()
    }

   
}

module.exports =validateStudent