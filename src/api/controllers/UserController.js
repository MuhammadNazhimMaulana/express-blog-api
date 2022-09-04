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

    // All Data
    profile = async (req, res) => {
        try {

            // Getting all user
            const user = await User.findOne({ email: req.user.email })

            return ResponseBulider.success(res, user);
        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }
}

module.exports = UserController