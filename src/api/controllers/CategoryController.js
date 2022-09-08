// Model
const Category = require('../models/Category');

// Helper
const ResponseBulider = require('../helpers/responseBuilder');

// Validation
const { validationResult } = require('express-validator');

class CategoryController{

    // All Data
    index = async (req, res) => {
        try {

            // Getting all categories
            const categories = await Category.find({ author: req.user.userId })
            
            return ResponseBulider.success(res, categories);

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message);
        }
    }
}

module.exports = CategoryController