// Model
const Category = require('../models/Category');

// Helpers
const ResponseBulider = require('../helpers/responseBuilder');
const Encryption = require('../helpers/encryption');

// Validation
const { validationResult } = require('express-validator');

class CategoryController{

    // All Data
    index = async (req, res) => {
        try {
            const limit = parseInt(req.query.limit)
            const cursor = req.query.cursor
            let decryptedCursor
            let categoriesCollection
            if (cursor) {
              decryptedCursor = Encryption.decrypt(cursor)
              let decrypedDate = new Date(decryptedCursor * 1000)
              categoriesCollection = await Category.find({
                created_at: {
                  $lt: new Date(decrypedDate),
                },
              })
                .sort({ created_at: -1 })
                .limit(limit + 1)
                .exec()
            } else {
              categoriesCollection = await Category.find({})
                .sort({ created_at: -1 })
                .limit(limit + 1)
            }
            const hasMore = categoriesCollection.length === limit + 1
            let nextCursor = null
            if (hasMore) {
              const nextCursorRecord = categoriesCollection[limit]
              var unixTimestamp = Math.floor(nextCursorRecord.created_at.getTime() / 1000)
              nextCursor = Encryption.encrypt(unixTimestamp.toString())
              categoriesCollection.pop()
            }

            let data = {
                result: categoriesCollection,
                nextCursor, 
                hasMore
            }

            return ResponseBulider.success(res, data);

            // Getting all categories
            // const categories = await Category.find({ author: req.user.userId })
            

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