const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db connection
const connection = require('../connection/dbConnection');

function getAllProgram(req , res){
    connection.query('SELECT * FROM program', (err, programs) => {
        if (err) throw err;
        const getprograms = [] ;
        res.render('program', { programs: programs , getprograms , table : false , addDiv : false , editDiv : true});
    });
};

const createProgram = async (req, res) => {

    var doctor_name = req.body.name ;
    var day = req.body.day ;
    var type = req.body.type ;
   

    const query = 'INSERT INTO program (doctor_name, day, type ) VALUES (?, ? , ? )';
    connection.query(query, [doctor_name, day , type ], (err, results) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Error inserting data into MySQL' });
        return;
    }
    console.log('Data inserted into MySQL');
    res.json({ message: 'Data inserted successfully', redirect: '/program' }); // Redirect URL

})
};

const updateProgram = async (req, res) => {

    var id = req.body.id ;
    var doctor_name = req.body.name ;
    var day = req.body.day ;
    var type = req.body.type ;
   


    const query = 'UPDATE program SET doctor_name = ?, day = ? , type = ? WHERE id = ?';
    connection.query(query, [doctor_name, day , type , id], (err, results) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Error inserting data into MySQL' });
        return;
    }
    console.log('MySQL data updated ');
    res.json({ message: 'Data updated successfully', redirect: '/program' }); // Redirect URL

    })
};

function deleteProgram(req, res, next) {	

    const { id } = req.params;
    connection.query('DELETE FROM program WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.redirect('/program');
    });

};


function getProgram(req , res){
    const { id } = req.params;
    
    connection.query('SELECT *  FROM program WHERE id =  ?', [id],(err, getprograms) => {
        if (err) throw err;
        connection.query('SELECT * FROM program', (err, programs) => {
            if (err) throw err;
        res.render('program', { getprograms: getprograms , table : false , addDiv : true , editDiv : false , programs : programs});
    });
});
};

module.exports = {
    getAllProgram ,
    createProgram,
    updateProgram ,
    deleteProgram,
    getProgram
} ;