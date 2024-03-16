var express = require('express');
const authController = require('../controllers/authController');
const usersController = require('../controllers/usersController');
const productController = require('../controllers/productController');
const bodyParser = require('body-parser');
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define your routes after configuring body-parser


app.post('/auth', authController.auth);
app.get('/' , authController.home) ;
app.get('/dashboard' , authController.dashboard) ;

app.get('/users' , usersController.getAllUsers );
app.post('/adduser', usersController.createUser);
app.post('/users/:id/edit', usersController.updateUser);
app.get('/users/:id/', usersController.getUser);
app.get('/users/:id/delete', usersController.deleteUser);

app.get('/products' , productController.getAllproducts)

module.exports = app;
