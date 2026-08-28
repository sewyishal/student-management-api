require('dotenv').config()
const express = require('express');
const connection =require('./config/db')
const createTables =require('./database/init')
const departmentRoutes= require('./routes/departmentRoutes')
const studentRoutes =require('./routes/studentRoutes')
const errorHandler=require('./middleware/errorHandler')
const userRoutes = require('./routes/userRoutes');
const app= express();
app.use(express.json())
app.use(departmentRoutes);
app.use(studentRoutes);
app.use(userRoutes);

app.use(errorHandler);
connection.query('SELECT 1', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected successfully');
        createTables();
    }
});
app.listen(3000,()=>{
    console.log("App is running at http://localhost:3000/ ")
})
