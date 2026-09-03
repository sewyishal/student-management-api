const connection = require("../config/db")

const addUserService = async (username,email,hashedpassword)=>{
    const role ="student"
    const sql=`INSERT INTO users(username,email,password,role) VALUES(?,?,?,?)`
    const values =[username,email,hashedpassword,role]
    const [results] = await connection.promise().query(sql,values)
    return results
}
const getUserByEmailService = async (email) =>{
    const sql = `SELECT * FROM users WHERE email=?`
    const values =[email]
    const [results]= await connection.promise().query(sql,values)
    return results
}
module.exports= {addUserService,getUserByEmailService}