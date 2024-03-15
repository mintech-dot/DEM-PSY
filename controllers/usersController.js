const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = require('../connection/dbConnection');




function getAllUsers(req , res){
    connection.query('SELECT * FROM users', (err, users) => {
        if (err) throw err;
        const getusers = []
        res.render('users', { users: users , getusers , table : false , addDiv : false , editDiv : true});
    });
};

function createUser(res, req){

    var name = req.body.name ;
    var address = req.body.address ;
    var phone = req.body.phone ;
    var type = req.body.type ;

    const query = 'INSERT INTO users (name, address , phone , type) VALUES (?, ? , ? , ?)';
    connection.query(query, [name, address , phone , type], (err, results) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Error inserting data into MySQL' });
        return;
    }
    console.log('Data inserted into MySQL');
    res.json({ message: 'Data inserted successfully', redirect: '/users' }); // Redirect URL
})
};

function updateUser(req, res, next) {	

    var id = req.body.id ;
    var name = req.body.name ;
    var address = req.body.address ;
    var phone = req.body.phone ;
    var type = req.body.type ;


    const query = 'UPDATE users SET name = ?, address = ? , phone = ?, type = ? WHERE id = ?';
    connection.query(query, [name, address , phone , type , id], (err, results) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Error inserting data into MySQL' });
        return;
    }
    console.log('MySQL data updated ');
    res.json({ message: 'Data updated successfully', redirect: '/users' }); // Redirect URL

    })
};

function deleteUser(req, res, next) {	

    const { id } = req.params;
    connection.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.redirect('/users');
    });

};


function getUser(req , res){
    const { id } = req.params;

    connection.query('SELECT *  FROM users WHERE id =  ?', [id],(err, getusers) => {
        if (err) throw err;
        const users = [];
        res.render('users', { getusers: getusers , table : true , addDiv : true , editDiv : false , users : users});
    });
};

module.exports = {
    getAllUsers ,
    createUser,
    updateUser ,
    deleteUser,
    getUser
} ;