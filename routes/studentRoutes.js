const express = require('express')
const {addStudent,getAllStudents,getStudentById,getStudentsWithDepartment, updateStudent, deleteStudent} = require('../controllers/studentController');
const validateStudent = require('../middleware/validateStudent');
const checkDepartment = require('../middleware/checkDepartment');
const authMiddleware = require('../middleware/authMiddleware')
const router =express.Router();

router.post('/students',validateStudent,checkDepartment,addStudent)

router.get('/students',authMiddleware,getAllStudents)

router.get('/students/:id',getStudentById)

router.get('/students-with-department',getStudentsWithDepartment)

router.put('/students/:id',validateStudent,checkDepartment,updateStudent)

router.delete('/students/:id',deleteStudent)

module.exports=router