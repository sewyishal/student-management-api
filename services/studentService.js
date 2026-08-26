const connection = require('../config/db')

const getAllStudentsService = async ()=>{
     const [results]= await connection.promise().query(`SELECT * FROM students`)
        
     return results 
}

const getStudentByIdService = async (id)=>{
    const sql=` SELECT * FROM students WHERE student_id=?`
    const values=[id]
    const [results]=await connection.promise().query(sql,values)

    return results
}
module.exports={getAllStudentsService,getStudentByIdService}

