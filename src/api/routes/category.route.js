// Contoh Routing
const express = require('express');
const { categoryValidationRules, validate } = require('../middlewares/validator')
const { authenticateJWT } = require('../middlewares/auth')
const router = express.Router();
const CategoryController = require('../controllers/category.controller')

const categoryController = new CategoryController()

// Use JWT Check
router.use(authenticateJWT)

// Index
router.get('/', categoryController.index);

// Show
router.get('/:_id', categoryController.show);

// Post
router.post('/', categoryValidationRules(), validate, categoryController.store);

// Update
router.put('/:_id', categoryValidationRules(), validate, categoryController.update)

// Delete
router.delete('/:_id', categoryController.delete)

module.exports = router;