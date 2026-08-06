const connection= require('../config/db')

const addDepartment=(req,res,next)=>{
    const sql=`INSERT INTO departments(department_name) VALUES(?)`
    const values=[req.body.department_name]
    connection.query(sql,values,(err,results)=>{
        if(err){
            next(err)
        }else{
           return res.status(201).json({
            success: true,
            message:"Department Added successfully",
            department_id: results.insertId
           })
        }
    })
}
const getAllDepartments =async (req,res,next)=>{
    try{
          const [results]= await connection.promise().query(`SELECT * FROM departments`) 
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
    const [results]= await connection.promise().query(sql,values,)
        
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

const deleteDepartment= (req,res,next)=>{
    const sql =`DELETE FROM departments WHERE department_id=?`
    const values=[req.params.id]
    connection.query(sql,values,(err,results)=>{
        if(err){
            return next(err)
        } else if(results.affectedRows===0){
            return res.status(404).json({
                success:false,
                message:"department not found"
            })
        }else{
            return res.status(200).json({
                success: true,
                message:"deparmtent deleted successfully"
            })
        }
    })
}

module.exports={addDepartment,getAllDepartments,getDepartmentById,updateDepartment,deleteDepartment}