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
 *                 example: "kebede"
 *               email:
 *                 type: string
 *                example:"keb@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post('/register',validateUser,registerUser)
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login existing user
 *     description: Authenticates a user and returns a JWT token.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "keb@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */
router.post('/login',loginUser)
router.get('/test', (req, res) => {
    res.send('User routes are working!');
});
module.exports = router