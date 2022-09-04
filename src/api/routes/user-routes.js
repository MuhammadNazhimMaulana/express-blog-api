// Contoh Routing
const express = require('express');
const { authenticateJWT } = require('../middlewares/auth')
const router = express.Router();
const UsertController = require('../controllers/UserController')

// Defining Controller
const usertController = new UsertController()

// Index
router.get('/', authenticateJWT, usertController.profile);

module.exports = router;