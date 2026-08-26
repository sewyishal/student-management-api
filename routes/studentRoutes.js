const express = require('express')
const connection =require('../config/db');
const {addStudent,getAllStudents,getStudentById,getStudentsWithDepartment, updateStudent, deleteStudent} = require('../controllers/studentController');
const validateStudent = require('../middleware/validateStudent');
const checkDepartment = require('../middleware/checkDepartment');

const router =express.Router();

router.post('/students',validateStudent,checkDepartment,addStudent)

router.get('/students',getAllStudents)

router.get('/students/:id',getStudentById)

router.get('/students-with-department',getStudentsWithDepartment)
ዝ
router.put('/students/:id',validateStudent,checkDepartment,updateStudent)

router.delete('/students/:id',deleteStudent)

module.exports=router