// Model
const User = require('../models/User');

// JWT 
const jwt = require("jsonwebtoken");

// Bcrypt
const bcrypt = require("bcrypt");

// Helper
const ResponseBulider = require('../helpers/responseBuilder');

// Validation
const { validationResult } = require('express-validator');

class UserController{

    // Checking Profile
    profile = async (req, res) => {
        try {

            // Getting all user
            const user = await User.findOne({ email: req.user.email })
            .populate('posts', { title: 1, body: 2}) // populate the relationship (specify field that need to be shown)
            .then((user) => {
                return ResponseBulider.success(res, user);
            })

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }

    // Change Password
    changeProfile = async (req, res) => {
        try {
            // Getting one user
            const user = await User.findOne({ email: req.user.email });

            // generate salt to hash password
            const salt = await bcrypt.genSalt(10);

            // now we set user password to hashed password
            req.body.password = await bcrypt.hash(req.body.password, salt);

            // Updating Token
            User.updateOne(
            {
                _id: user._id
            },
            {
                $set: {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                }
            }
            ).then( async (result) => {
            
            // Redirect 
            return ResponseBulider.success(res, user);
        });

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }

}

module.exports = UserController