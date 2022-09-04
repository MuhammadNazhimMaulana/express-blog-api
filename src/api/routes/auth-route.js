// Contoh Routing
const express = require('express');
const { loginRules, validate, userValidationRules } = require('../middlewares/validator')
const { authenticateJWT } = require('../middlewares/auth')
const router = express.Router();
const AuthController = require('../controllers/AuthController')

// Defining Controller
const authController = new AuthController()

// Login
router.post('/login', authController.login);

// Register
router.post('/', userValidationRules(), validate, authController.register);

// Logout
router.post('/logout', authenticateJWT, authController.logout);

module.exports = router;