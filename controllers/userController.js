const bcrypt = require('bcrypt');
const {addUserService} = require('../services/userService')
const registerUser = async (req,res,next)=>{
    
    try{
        const {username,email,password}=req.body
        const hashedPassword= await bcrypt.hash(password,10);
        const results = await addUserService(username,email,hashedPassword)
        return res.status(201).json({
            success: true,
            message:"user registered successfully",
            user_id: results.insertId
        }) 
    } catch(err){
       return next(err)
    }
}
module.exports={registerUser}