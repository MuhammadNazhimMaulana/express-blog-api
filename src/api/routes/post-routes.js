// Contoh Routing
const express = require('express');
const { postValidationRules, validate } = require('../middlewares/validator')
const { authenticateJWT } = require('../middlewares/auth')
const router = express.Router();

// Multer
const multer = require('multer');

// Storage for uploaded File
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
       cb(null, Date.now() + '-' + file.originalname);
    }
 });
 
// Used Middleware
const upload = multer({ storage: storage });

const PostController = require('../controllers/PostController')

const postController = new PostController()

// Use JWT Check
router.use(authenticateJWT)

// Index
router.get('/', postController.index);

// Show
router.get('/:_id', postController.show);

// Post
router.post('/', upload.single('image'), postValidationRules(), validate, postController.store);

// Update
router.put('/:_id', postValidationRules(), validate, postController.update)

// Update
router.delete('/:_id', postController.delete)

module.exports = router;