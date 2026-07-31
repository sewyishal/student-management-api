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
module.exports=addDepartment