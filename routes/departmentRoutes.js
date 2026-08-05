const express =require('express');

const connection=require('../config/db');
const {addDepartment,getAllDepartments,getDepartmentById,updateDepartment, deleteDepartment} = require('../controllers/departmentController');
const validateDepartment = require('../middleware/validateDepartment');

const router = express.Router()

router.post('/departments',validateDepartment,addDepartment)

router.get('/departments',getAllDepartments)

router.get('/departments/:id',getDepartmentById)

router.put('/departments/:id',validateDepartment,updateDepartment)
router.delete('/departments/:id',deleteDepartment)

module.exports=router