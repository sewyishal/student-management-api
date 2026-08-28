console.log("userRoutes loaded");
const express = require('express')
const {registerUser,loginUser} = require('../controllers/userController')
const validateUser = require ('../middleware/validateUser') 

const router = express.Router()

router.post('/register',validateUser,registerUser)
router.post('/login',loginUser)
router.get('/test', (req, res) => {
    res.send('User routes are working!');
});
module.exports = router