const {body,validationResult}= require('express-validator')
body("username")
.notEmpty()
.withMessage("Username is required")

 body("email")
.notEmpty()
.withMessage("Email is required")
.isEmail()
.withMessage("Email format is invalid")

body("password")
.notEmpty()
.withMessage("password is required")
.isLength({min: 6})
.withMessage("Password must be at least 6 characters long")

const validateUser = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    next()
}

module.exports= validateUser;