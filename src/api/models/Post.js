const mongoose = require('mongoose');

// Skema Post
const postSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    published: {
        type: Boolean
    }
    },    
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Post = mongoose.model('Post', postSchema);

module.exports = Post