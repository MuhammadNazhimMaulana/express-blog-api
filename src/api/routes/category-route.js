// Contoh Routing
const express = require('express');
const { categoryValidationRules, validate } = require('../middlewares/validator')
const { authenticateJWT } = require('../middlewares/auth')
const router = express.Router();
const CategoryController = require('../controllers/CategoryController')

const categoryController = new CategoryController()

// Use JWT Check
router.use(authenticateJWT)

// Index
router.get('/', categoryController.index);

// Post
router.post('/', categoryValidationRules(), validate, categoryController.store);

module.exports = router;