const {getAllStudentsService,getStudentByIdService,addStudentService,updateStudentService, deleteStudentService, getStudentsWithDepartmentService } = require('../services/studentService')
   

const addStudent= async (req,res,next)=>{
    try{
        const results= await addStudentService(req.body.student_name,req.body.email,req.body.department_id)
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
         const results= await getStudentByIdService(req.params.id)
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
        const results = await getStudentsWithDepartmentService()
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
    const results= await updateStudentService(req.body.student_name,req.body.email,req.body.department_id,req.params.id)

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
    const results= await deleteStudentService(req.params.id)
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