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
module.exports ={addDepartmentService,getAllDepartmentsService}