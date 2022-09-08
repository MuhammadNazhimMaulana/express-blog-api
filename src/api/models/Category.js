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
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category