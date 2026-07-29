const express = require('express');
const connection =require('./config/db')
const createTables =require('./database/init')
const departmentRoutes= require('./routes/departmentRoutes')
const studentRoutes =require('./routes/studentRoutes')
const errorHandler=require('./middleware/errorHandler')

const app= express();


app.use(express.json())
app.use(departmentRoutes);
app.use(studentRoutes);
app.use((err, req, res, next) => {
    console.log("ERROR HANDLER REACHED")
    console.log(err)
   if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            message: "Email already exists"
        })
    }

    
    res.status(500).json({
        success: false,
        message: "Something went wrong"
    })
})

connection.connect((err)=>{
    if(err){
        console.log(err)
    } else{
        console.log("Database connected successfully")   
    }
})
app.listen(3000,()=>{
    console.log("App is running at http://localhost:3000/ ")
})
