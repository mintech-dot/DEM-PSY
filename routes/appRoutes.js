var express = require('express');
const authController = require('../controllers/authController');
const usersController = require('../controllers/usersController');

const bodyParser = require('body-parser');
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define your routes after configuring body-parser


app.post('/auth', authController.auth);
app.get('/' , authController.home) ;
app.get('/dashboard' , authController.dashboard) ;


app.get('/users' , usersController.users)
app.post('/adduser' , usersController.add);





module.exports = app;
