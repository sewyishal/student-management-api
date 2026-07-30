const connection = require('../config/db')
const checkDepartment =(req,res,next)=>{
   const sql = `SELECT * FROM departments WHERE department_id = ?`  
connection.query(sql, [req.body.department_id], (err, results) => {
    
    if (err) {
        return next(err);
    }

    if (results.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Department does not exist"
        });
    }

    next();
});
}

module.exports=checkDepartment;
