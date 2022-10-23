// Model
const Post = require('../models/Post');
const User = require('../models/User');
const Category = require('../models/Category');

// Helper
const ResponseBulider = require('../helpers/responseBuilder');
const Pagination = require('../helpers/pagination');

// Validation
const { validationResult } = require('express-validator');

class PostController{

    // All Data
    index = async (req, res) => {
        try {

            // Getting All Post with pagination
            new Pagination(req, Post, 'author').paginate().then((result) => {

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

            // Getting one posts
            const post = await Post.findOne({ _id: req.params._id })
            .populate('author', { _id: 1, username: 2, email: 3})
            .then((post) => {
                
                return ResponseBulider.success(res, post);
            });
            
        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message);
        }
    }

    // Store Data
    store = async (req, res) => {
        // Konstanta errors
        const errors = validationResult(req);

        // Preparing Image
        req.body.image = {
            data: req.file.filename,
            contenType: 'image/png'
        }

        // Kalau error
        if(!errors.isEmpty())
        {
            // Status
            res.status(422);

            // Return 
            return ResponseBulider.error(res, 422, errors.errors);   
        }else{

            // Getting one user
            const user = await User.findOne({ email: req.user.email });
            
            // Adding current logged user
            req.body.author = user._id;

            // Finding Each Categories
            req.body.categories.forEach(async(key, value) => {

                // Finding Category
                const category = await Category.findOne({ _id: key });

                // If Category is not exist
                if(!category){
                    return ResponseBulider.error(res, 404, 'Category Tidak ditemukan');   
                }
            });
            
            
            // New Function for creating post
            Post.create(req.body, async (error, result) => {

                // Updating User
                User.updateOne(
                    { 
                        _id: result.author 
                    },
                    {
                        $push: {
                            posts: result._id,
                            categories: req.body.categories
                        }
                    },
                    {
                        new: true
                    }
                    ).then((user) => {

                        return ResponseBulider.success(res, result);
                    })
            });

        }       
    }

    // Update 
    update = (req, res) => {
        // Konstanta errors
        const errors = validationResult(req);
    
        // Kalau error
        if(!errors.isEmpty())
        {
            // Status
            res.status(422);

            // Redirect 
            return ResponseBulider.error(res, 422, errors.errors);   
        }else{
    
            // New Function for adding contact
            Post.updateOne(
                {
                    _id: req.params._id
                },
                {
                    $set: {
                        title: req.body.title,
                        body: req.body.body,
                        published: req.body.published
                    }
                }
                ).then( async (result) => {
                
                // Getting one post 
                const post = await Post.findOne({ _id: req.params._id });

                // Redirect 
                return ResponseBulider.success(res, post);
            });
        }
    }

    // Delete
    delete = async (req, res) => {

        // Getting one user
        const user = await User.findOne({ email: req.user.email });

        // Delete Process
        Post.deleteOne({ _id: req.params._id}, async (error, result) => {

            // Updating User
            User.updateOne(
                { 
                    _id: user._id 
                },
                { 
                    $pull: { 
                        posts: req.params._id 
                    } 
                },
                {
                    new: true
                }
                ).then((user) => {

                    return ResponseBulider.success(res, user);
                })
        });        
    }

}

module.exports = PostController