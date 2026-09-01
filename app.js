const express = require('express');
const departmentRoutes= require('./routes/departmentRoutes')
const studentRoutes =require('./routes/studentRoutes')
const userRoutes = require('./routes/userRoutes');
const errorHandler=require('./middleware/errorHandler')

const app= express();
app.use(express.json())

app.use(departmentRoutes);
app.use(studentRoutes);
app.use(userRoutes);

app.use(errorHandler);

module.exports = app;
