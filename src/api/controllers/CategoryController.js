// Model
const Category = require('../models/Category');

// Helpers
const ResponseBulider = require('../helpers/responseBuilder');
const Pagination = require('../helpers/pagination');

// Validation
const { validationResult } = require('express-validator');

class CategoryController{

    // All Data
    index = async (req, res) => {
        try {

            // Pagination
            new Pagination(req, Category).paginate().then((result) => {

                return ResponseBulider.success(res, result);
            });           

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message);
        }
    }

    // One Data
    show = async (req, res) => {
        try {

            // Getting one category
            const category = await Category.findOne({ _id: req.params._id })

            return ResponseBulider.success(res, category);
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

    // Update Data
    update = async (req, res) => {
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

            // Updating Category
            Category.updateOne(
                {
                    _id: req.params._id
                },
                {
                    $set: {
                        name: req.body.name,
                        slug: req.body.slug
                    }
                }
                ).then( async (result) => {
                
                // Getting one category 
                const category = await Category.findOne({ _id: req.params._id });

                // Redirect 
                return ResponseBulider.success(res, category);
            });

        }       
    }

    // Delete
    delete = (req, res) => {

        // Delete Process
        Category.deleteOne({ _id: req.params._id}).then((result) => {
            
            // Redirect 
            return ResponseBulider.success(res, result);
        });        
    }
}

module.exports = CategoryController