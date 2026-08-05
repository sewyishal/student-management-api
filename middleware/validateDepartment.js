const connection = require('../config/db')

const validateDepartment =(req,res,next)=>{
    if(!req.body.department_name){
        return res.status(400).json({
            success: false,
            message:"Department name is required"
        })
    }
    next()
}
module.exports =validateDepartment