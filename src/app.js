const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override')

// Env
require('dotenv').config();

// Connection
require('./config/db');

const app = express();

// Set up method override
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Seperate Route
const auth_route = require('./api/routes/auth-route');
const category_route = require('./api/routes/category-route');
const post_route = require('./api/routes/post-routes');
const user_route = require('./api/routes/user-routes');
app.use('/auth', auth_route);
app.use('/category', category_route);
app.use('/post', post_route);
app.use('/user', user_route);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
})