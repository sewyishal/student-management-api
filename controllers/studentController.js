const connection = require('../config/db')
const {getAllStudents: getAllStudentsService } = require('../services/studentService')

const addStudent= async (req,res,next)=>{
    try{
        const sql= `INSERT INTO students(student_name,email,department_id)VALUES(?,?,?)`
        const values=[req.body.student_name,req.body.email,req.body.department_id]
        const [results]=await connection.promise().query(sql,values)
        return res.status(201).json({
            success: true,
            message: "Student inserted successfully",
            student_id:results.insertId
        })
    }
    catch(err){
        return next(err)
    }
    
}
const getAllStudents = async (req,res,next)=>{
    try{
        const results= await getAllStudentsService()
        return res.json({
            success: true,
            data: results
        })
    } catch(err){
        return next(err)
    }
}

const getStudentById= async (req,res,next)=>{
    try{
        const sql =`SELECT * FROM students WHERE student_id=?`
        const values=[req.params.id]
        const [results]= await connection.promise().query(sql,values)
            if(results.length===0){
        return res.status(404).json({
            success: false,
            message:"Student not found"
        })
        }
        return res.status(200).json({
            success: true,
            data: results[0]
        })
    } catch(err){
        return next(err)
    }
}
const getStudentsWithDepartment = async (req,res,next)=>{
    try{
        const [results]= await connection.promise().query(`SELECT students.student_name , students.email, departments.department_name 
        FROM students 
        JOIN departments 
        ON students.department_id=departments.department_id`)

        return res.status(200).json({
            success: true,
            data: results
        })
    } catch(err){
        return next(err)
    }
}


const updateStudent = async (req,res,next)=>{
   try{
     const sql=`UPDATE students SET 
    student_name=?, email=?,department_id=? WHERE student_id=?` 
    const values=[req.body.student_name,req.body.email,req.body.department_id,req.params.id]
    const [results]= await connection.promise().query(sql,values)
        if(results.affectedRows===0){
        return res.status(404).json({
            success: false,
            message:"Student not found"
        })
    }
    return res.status(200).json({
        success: true,
        message:"Student updated successfully"
    })
   } 
   catch(err){
    return next(err)
   }
}

const deleteStudent = async (req,res,next)=>{
   try{
    const sql =`DELETE FROM students WHERE student_id=?`
    const values=[req.params.id]
    const [results]= await connection.promise().query(sql,values)

    if(results.affectedRows===0){
        return res.status(404).json({
            success: false,
            message:"Student not found"
        })
    }
    return res.status(200).json({
        success: true,
        message:"Student deleted successfully"
    })
} 
catch(err){
    return next(err)
   }
}

module.exports={addStudent,getAllStudents,getStudentById,getStudentsWithDepartment,updateStudent,deleteStudent}