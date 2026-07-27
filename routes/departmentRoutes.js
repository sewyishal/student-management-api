const express =require('express');

const connection=require('../config/db')

const router = express.Router()

router.post('/departments',(req,res)=>{
    const sql=`INSERT INTO departments(department_name) VALUES(?)`
    const values=[req.body.department_name]
    connection.query(sql,values,(err,results)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.json(results)
            console.log("Department added successfully")
        }
    })
})

module.exports=router