const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = require('../connection/dbConnection');


function users(req, res, next) {	
    res.render('users');
};

function add(res, req){

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
    res.json({ message: 'Data inserted successfully', redirect: '/success' }); // Redirect URL
})
}



module.exports = {
    add,
    users
} ;