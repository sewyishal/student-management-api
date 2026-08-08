const connection = require('../config/db')

const getAllStudentsService = async ()=>{
     const [results]= await connection.promise().query(`SELECT * FROM students`)
        
     return results 
}
module.exports={getAllStudentsService}