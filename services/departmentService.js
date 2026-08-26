const connection = require('../config/db')

const addDepartmentService = async(department_name)=>{
    const sql=`INSERT INTO departments(department_name) VALUES(?)`
        const values=[department_name]
        const [results]= await connection.promise().query(sql,values)
        return results
}

const getAllDepartmentsService = async()=>{
    const [results]= await connection.promise().query(`SELECT * FROM departments`) 
    return results
}
const getDepartmentByIdService = async(id)=>{
    const sql=`SELECT * FROM departments WHERE department_id=?`
    const values= [id ]
    const [results]= await connection.promise().query(sql,values)
    return results
}
const updateDepartmentService = async(department_name,id)=>{
    const sql=`UPDATE departments SET department_name=? WHERE department_id=?`
    const values=[department_name,id]
    const [results]= await connection.promise().query(sql,values)
    return results
}
const deleteDepartmentService= async(id)=>{
    const sql= `DELETE FROM departments WHERE department_id=?`
         const values=[id]
         const [results]= await connection.promise().query(sql,values)
         return results
}


module.exports ={addDepartmentService,getAllDepartmentsService,getDepartmentByIdService,updateDepartmentService,deleteDepartmentService}