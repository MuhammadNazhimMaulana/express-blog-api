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

    // Store Data
    store = async (req, res) => {
        // Konstanta errors
        const errors = validationResult(req);
    
        // Kalau error
        if(!errors.isEmpty())
        {
            // Status
            res.status(422);

            // Return 
            return ResponseBulider.error(res, 422, errors.errors);   
        }else{

            // Creating Category
            Category.create(req.body, async (error, category) => {

                // Return 
                return ResponseBulider.success(res, category);
            });

        }       
    }
}

module.exports = CategoryController