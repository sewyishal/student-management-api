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


const addStudentService = async(student_name,email,department_id)=>{
     const sql= `INSERT INTO students(student_name,email,department_id)VALUES(?,?,?)`
        const values=[student_name,email,department_id]
        const [results]=await connection.promise().query(sql,values)
        
        return results
}
const updateStudentService = async (
    student_name,email,department_id,id
) =>{
    const sql=`UPDATE students SET 
    student_name=?, email=?,department_id=? WHERE student_id=?` 
    
}

module.exports={getAllStudentsService,getStudentByIdService,addStudentService}