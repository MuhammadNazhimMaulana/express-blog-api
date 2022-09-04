// Contoh Routing
const express = require('express');
const { loginRules, validate, userValidationRules } = require('../middlewares/validator')
const { authenticateJWT } = require('../middlewares/auth')
const router = express.Router();
const UsertController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')

// Defining Controller
const usertController = new UsertController()
const authController = new AuthController()

// Index
router.get('/', authenticateJWT, usertController.profile);

// Login
router.post('/login', authController.login);

// Register
router.post('/', userValidationRules(), validate, authController.register);

module.exports = router;