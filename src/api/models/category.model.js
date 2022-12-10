const mongoose = require('mongoose');

// Skema Category
const categorySchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    }
    }, 
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category