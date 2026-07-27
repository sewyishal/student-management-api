const express =require('express');

const connection=require('../config/db');
const addDepartment = require('../controllers/departmentController');

const router = express.Router()

router.post('/departments',addDepartment)

module.exports=router