var express = require('express');
const authController = require('../controllers/authController');
const usersController = require('../controllers/usersController');
const connection = require('../connection/dbConnection');
const bodyParser = require('body-parser');
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define your routes after configuring body-parser


app.post('/auth', authController.auth);
app.get('/' , authController.home) ;
app.get('/dashboard' , authController.dashboard) ;


app.get('/users' , usersController.getAllUsers )
app.post('/adduser', (req, res) => {

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

});

app.post('/users/:id/edit', (req, res) => {

    var id = req.body.id ;
    var name = req.body.name ;
    var address = req.body.address ;
    var phone = req.body.phone ;
    var type = req.body.type ;

    console.log(name , id , type);
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


});

app.get('/users/:id/delete', usersController.deleteUser);
app.get('/users/:id/', usersController.getUser , usersController.getAllUsers);



module.exports = app;
