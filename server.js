const express = require('express');
const  mysql = require('mysql2')

const app= express();

app.use(express.json())

const connection= mysql.createConnection({
    host:"localhost",
    user:"abebe",
    password:"abe123",
    database:"mini"
})
connection.connect((err)=>{
    if(err){
        console.log(err)
    } else{
        console.log("Database connected successfully")
        connection.query(`CREATE TABLE IF NOT EXISTS departments(
            department_id INT AUTO_INCREMENT PRIMARY KEY ,department_name VARCHAR(255) NOT NULL )`,(err,results)=>{
                if(err){
                    console.log(err)
                }else{
                    connection.query(`CREATE TABLE IF NOT EXISTS students(
                        student_id INT AUTO_INCREMENT PRIMARY KEY ,student_name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE ,department_id  INT,
                         FOREIGN KEY(department_id) REFERENCES departments(department_id))`,(err,results)=>{
                            if(err){
                                console.log(err)
                            }else{
                                console.log("Table created successfully")
                            }
                         })
                }
            })
    }
})

app.post('/departments',(req,res)=>{
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

app.post('/students',(req,res)=>{
    const sql=`INSERT INTO students(student_name,email,department_id)VALUES(?,?,?)`
    const values=[req.body.student_name,req.body.email,req.body.department_id]
    connection.query(sql,values,(err,results)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.json(results)
            console.log("Student added successfully")
        } 
    })
})

app.get('/students',(req,res)=>{
    connection.query(`SELECT * FROM students`,(err,results)=>{
        if(err){}
    })

})


app.listen(3000,()=>{
    console.log("App is running at http://localhost:3000/ ")
})