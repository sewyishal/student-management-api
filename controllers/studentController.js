const connection = require('../config/db')

const addStudent= async (req,res,next)=>{
    try{
        const sql= `INSERT INTO students(student_name,email,department_id)VALUES(?,?,?)`
        const values=[req.body.student_name,req.body.email,req.body.department_id]
        const [results]=await connection.promise().query(sql,values)
        res.status(201).json({
            success: true,
            message: "Student inserted successfully",
            student_id:results.insertId
        })
    }
    catch(err){
        return next(err)
    }
    
}
const getAllStudents =(req,res,next)=>{
    connection.query(`SELECT * FROM students`,(err,results)=>{
        if(err){
           next(err)
        }else{
            return res.status(200).json({
                success: true,
                data: results
            })
        }
    })
}
const getStudentById= (req,res,next)=>{
    const sql=`SELECT * FROM students WHERE student_id=?`
    const values=[req.params.id]
    connection.query(sql,values,(err,results)=>{
        if(err){
           next(err)
        }else if(results.length===0){
            res.status(404).send("Student not found")
        }else{
            return res.status(200).json({
                success:true,
                data: results[0]
            })
        }
    })
}
const getStudentsWithDepartment= (req,res,next)=>{ connection.query(`SELECT
         students.student_id ,
         students.student_name ,
         students.email ,
         departments.department_name
         FROM students
         JOIN departments
         ON students.department_id=departments.department_id`,(err,results)=>{
            if(err){
                next(err)
            } else{
                res.json(results)
            }
         })
}
const updateStudent = (req,res,next)=>{
    const sql=`UPDATE students SET 
    student_name=?, email=?,department_id=? WHERE student_id=?` 
    const values=[req.body.student_name,req.body.email,req.body.department_id,req.params.id]
    connection.query(sql,values,(err,results)=>{
        if(err){
            next(err)
        } else if(results.affectedRows==0){
            return res.status(400).json({
                success: false,
                message:"Student not found"
            })
        } else{
            console.log("Table Updates successfully")
           return res.status(200).json({
            success: true,
            message:"Student updated successfully"
           })
        }
    })
}

const deleteStudent = (req,res,next)=>{
    const sql =`DELETE FROM students WHERE student_id=?`
    const values=[req.params.id]
    connection.query(sql,values,(err,results)=>{
        if(err){
            next(err)
        }else if(results.affectedRows===0){
            return res.status(400).json({
                success:false,
                message:"Student not found"
            })
        }else{
         return res.status(200).json({
            success:false,
            message:"Student deleted successfully"
         })
        }
    })
}

module.exports={addStudent,getAllStudents,getStudentById,getStudentsWithDepartment,updateStudent,deleteStudent}