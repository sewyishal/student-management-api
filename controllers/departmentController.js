const connection= require('../config/db')
const {getAllDepartmentsService, addDepartmentService } = require('../services/departmentService')
const addDepartment=async (req,res,next)=>{
    try{
        const results = addDepartmentService(req.params.department_name)
        return res.status(201).json({
            success: true,
            message:"Department added successfully",
            department_id:results.insertId
        })
    }
    catch(err){
        return next(err)
    } 
}
const getAllDepartments =async (req,res,next)=>{
    try{
        const results= await getAllDepartmentsService()
           return res.status(200).json({
            success: true,
            data: results
          }) 
    }
    catch(err){
        return next(err)
    }  
} 
const getDepartmentById= async (req,res,next)=>{
    try{
    const sql=`SELECT * FROM departments WHERE department_id=?`
    const values= [req.params.id ]
    const [results]= await connection.promise().query(sql,values)

    if(results.length===0){
        return res.status(404).json({
            success: false,
            message:"Department not found"
        })
    }
        
   return res.status(200).json({
    success: true,
    data: results[0]
   })
   }
catch(err){
    return next(err)
}}

const updateDepartment= async (req,res,next)=>{
    try{
    const sql=`UPDATE departments SET department_name=? WHERE department_id=?`
    const values=[req.body.department_name,req.params.id]
    const [results]= await connection.promise().query(sql,values)
        
    if(results.affectedRows===0){
        return res.status(404).json({
            success: false,
            message:"Department is not found"
        })
    }
    return res.status(200).json({
        success: true,
        message:"Department updated successfully"
    })
    }
    catch(err){
        return next(err)
    }
   
}

const deleteDepartment = async (req,res,next)=>{
    try{
         const sql= `DELETE FROM departments WHERE department_id=?`
         const values=[req.params.id]
         const [results]= await connection.promise().query(sql,values)
         if (results.affectedRows === 0) {
          return res.status(404).json({
           success: false,
           message: "Department not found"
         });
        }
         return res.status(200).json({
            success: true,
            message: "Department deleted successfully"
         })

    }
   catch(err){
    return next(err)
   }
}

module.exports={addDepartment,getAllDepartments,getDepartmentById,updateDepartment,deleteDepartment}