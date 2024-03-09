var express = require('express');
const connection = require('../connection/dbConnection');


function auth(req, res, next) {	

	var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
        connection.query('SELECT * FROM account WHERE username = ?', [username], function(error, data) {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).send('Internal Server Error');
            }

            if (data.length > 0) {
                var found = false;
                data.forEach(function(account) {
                    if (account.password === password) {
                        found = true;
                    }
                });

                if (found = true) {
                    return res.redirect("/dashboard");
                } else {
                    res.send('<script>window.location.reload()</script>');                }
            } 
        });
    } 
};

function home(req, res, next) {	
    res.render('index');
};

function dashboard(req, res, next) {	
    res.render('dashboard');
};


module.exports = {
    auth ,
	home,
	dashboard 

};