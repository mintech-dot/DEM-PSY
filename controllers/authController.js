var express = require('express');
const connection = require('../connection/dbConnection');


function auth(req, res, next) {	

	var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
        connection.query('SELECT * FROM account WHERE username = ? AND password = ? ', [username , password], function(error, data) {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).send('Internal Server Error');
            }

            if (data.length > 0) {
                
                    return res.redirect("/dashboard");
                } else {
                    res.redirect('/');        
                            
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