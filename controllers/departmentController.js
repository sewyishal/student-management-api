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
const getAllDepartments =(req,res,next)=>{
    connection.query(`SELECT * FROM departments`,(err,results)=>{
        if(err){
          return next(err)
        }else{
            return res.status(200).json({
                success: true,
                data: results
            })
        }
    })
} 
const getDepartmentById=(req,res,next)=>{
    const sql=`SELECT * FROM departments WHERE department_id=?`
    const values= [req.params.id ]
    connection.query(sql,values,(err,results)=>{
        if(err){
            return next(err)
        }else if(results.length===0){
            res.status(404).json({
                success: false,
                message:"Department not found"
            })
        }else{
            res.status(200).json({
                success:true,
                data: results[0]
            })
        }
    })
}

const updateDepartment= (req,res,next)=>{
    const sql=`UPDATE departments SET department_name=? WHERE department_id=?`
    const values=[req.body.department_name,req.params.id]
    connection.query(sql,values,(err,results)=>{
        if(err){
            return next(err)
        } else if(results.affectedRows===0){
            res.status(404).json({
                success: false,
                message:"Department not found"
            })
        }
        else{
            res.status(200).json({
                success: true,
                message:"Department updated successfully"
            })
        }
    })
}

module.exports={addDepartment,getAllDepartments,getDepartmentById,updateDepartment}