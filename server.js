const express = require('express');
const connection =require('./config/db')
const departmentRoutes= require('./routes/departmentRoutes')
const studentRoutes =require('./routes/studentRoutes')
const app= express();

app.use(express.json())

app.use(departmentRoutes);
 app.use(studentRoutes);


connection.connect((err)=>{
    if(err){
        console.log(err)
    } else{
        console.log("Database connected successfully")
        connection.query(`CREATE TABLE IF NOT EXISTS departments(
            department_id INT AUTO_INCREMENT PRIMARY KEY ,department_name VARCHAR(255) NOT NULL )`,
            (err,results)=>{
                if(err){
                    console.log(err)
                }else{
                    connection.query(`CREATE TABLE IF NOT EXISTS students(
                        student_id INT AUTO_INCREMENT PRIMARY KEY ,student_name VARCHAR(255) NOT NULL, 
                        email VARCHAR(255) UNIQUE ,department_id  INT,
                         FOREIGN KEY(department_id) REFERENCES departments(department_id))`,
                         (err,results)=>{
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





app.listen(3000,()=>{
    console.log("App is running at http://localhost:3000/ ")
})
