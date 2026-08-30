console.log("userRoutes loaded");
const express = require('express')
const {registerUser,loginUser} = require('../controllers/userController')
const validateUser = require ('../middleware/validateUser') 

const router = express.Router()
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post('/register',validateUser,registerUser)
router.post('/login',loginUser)
router.get('/test', (req, res) => {
    res.send('User routes are working!');
});
module.exports = router