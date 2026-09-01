const express = require('express')
const {addStudent,getAllStudents,getStudentById,getStudentsWithDepartment, updateStudent, deleteStudent} = require('../controllers/studentController');
const validateStudent = require('../middleware/validateStudent');
const checkDepartment = require('../middleware/checkDepartment');
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const router =express.Router();

router.post('/students',validateStudent,checkDepartment,addStudent)
/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *       401:
 *         description: Unauthorized
 */
router.get('/students',authMiddleware,getAllStudents)

router.get('/students/:id',getStudentById)

router.get('/students-with-department',getStudentsWithDepartment)

router.put('/students/:id',validateStudent,checkDepartment,updateStudent)

router.delete('/students/:id',authMiddleware,roleMiddleware("admin"),deleteStudent)

module.exports=router