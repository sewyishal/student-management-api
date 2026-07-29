const express = require('express')
const connection =require('../config/db');
const {addStudent,getAllStudents,getStudentById,getStudentsWithDepartment, updateStudent, deleteStudent} = require('../controllers/studentController');
const validateStudent = require('../middleware/validateStudent');

const router =express.Router();

router.post('/students',validateStudent,addStudent)

router.get('/students',getAllStudents)

router.get('/students/:id',getStudentById)

router.get('/students-with-department',getStudentsWithDepartment)

router.put('/students/:id',updateStudent)

router.delete('/students/:id',deleteStudent)

module.exports=router