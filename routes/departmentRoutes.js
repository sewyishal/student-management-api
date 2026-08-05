const express =require('express');

const connection=require('../config/db');
const {addDepartment,getAllDepartments,getDepartmentById} = require('../controllers/departmentController');
const validateDepartment = require('../middleware/validateDepartment');

const router = express.Router()

router.post('/departments',validateDepartment,addDepartment)

router.get('/departments',getAllDepartments)

router.get('/departments/:id',getDepartmentById)

module.exports=router