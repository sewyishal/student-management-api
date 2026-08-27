const connection = require("../config/db")

const addUserService = async (username,email,hashedpassword)=>{
    const sql=`INSERT INTO users(username,email,password) VALUES(?,?,?)`
    const values =[username,email,hashedpassword]
    const [results] = await connection.promise().query(sql,values)
    return results
}

module.exports= {addUserService}