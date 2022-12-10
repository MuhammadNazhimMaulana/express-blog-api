// Contoh Routing
const express = require('express');
const { authenticateJWT } = require('../middlewares/auth');
const { validate, userValidationRules } = require('../middlewares/validator');
const router = express.Router();
const UsertController = require('../controllers/api/user.controller');

// Defining Controller
const usertController = new UsertController();

// Use JWT Check
router.use(authenticateJWT);

// Index
router.get('/', usertController.profile);

// Change Profile
router.post('/', userValidationRules(), validate, usertController.changeProfile);

module.exports = router;