const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {addUserService,getUserByEmailService} = require('../services/userService')
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

const loginUser = async(req,res,next)=>{
    try {
        const {email,password} = req.body
        const results =await getUserByEmailService(email)
        if(results.length ===0){
            return res.status(401).json({
                success: false,
                message:"Invalid email or password"
            })
        }
        const user = results[0]
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message:"Invalid email or password"
            })
        }
        return res.status(200).json({
            success: true,
            message:"Login successfull"
        })
    } catch(err){
        return next(err)
    }
}

module.exports={registerUser,loginUser}