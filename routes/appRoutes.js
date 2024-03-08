var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const session = require('express-session');
const connection = require('../connection/dbConnection');


/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('index');
  });

router.post('/auth', function(req, res) {
	// Capture the input fields
	let username = req.body.username;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM account WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = username;
				// Redirect to home page
				res.redirect('/');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} 
});




module.exports = router;
