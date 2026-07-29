const connection = require('../config/db')

const addStudent= (req,res,next)=>{
    const sql=`INSERT INTO students(student_name,email,department_id)VALUES(?,?,?)`
    const values=[req.body.student_name,req.body.email,req.body.department_id]
    connection.query(sql,values,(err,results)=>{
        if(err){
            next(err)
        }else{
            res.json(results)
            console.log("Student added successfully")
        } 
    })
}

const getAllStudents =(req,res,next)=>{
    connection.query(`SELECT * FROM students`,(err,results)=>{
        if(err){
           next(err)
        }else{
            res.json(results)
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
            res.json(results)
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
            res.status(404).send('Student not found')
        } else{
            console.log("Table Updates successfully")
            res.status(200).send("student table updated successfully")
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
            res.status(404).send("student doesn't exist")
        }else{
            res.status(200).send("student deleted successfully")
        }
    })
}

module.exports={addStudent,getAllStudents,getStudentById,getStudentsWithDepartment,updateStudent,deleteStudent}