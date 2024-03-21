const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db connection
const connection = require('../connection/dbConnection');

function getAllMedicament(req , res){
    connection.query('SELECT * FROM medicament', (err, medicaments) => {
        if (err) throw err;
        const getmedicaments = [] ;
        res.render('medicament', { medicaments: medicaments , getmedicaments , table : false , addDiv : false , editDiv : true});
    });
};

const createMedicament = async (req, res) => {

    var med_name = req.body.name ;
    var day = req.body.day ;
    var night = req.body.night ;
   

    const query = 'INSERT INTO medicament (med_name, day, night ) VALUES (?, ? , ? )';
    connection.query(query, [med_name, day , night ], (err, results) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Error inserting data into MySQL' });
        return;
    }
    console.log('Data inserted into MySQL');
    res.json({ message: 'Data inserted successfully', redirect: '/medicament' }); // Redirect URL

})
};

const updateMedicament = async (req, res) => {

    var id = req.body.id ;
    var med_name = req.body.name ;
    var day = req.body.day ;
    var night = req.body.night ;
   


    const query = 'UPDATE medicament SET med_name = ?, day = ? , night = ? WHERE id = ?';
    connection.query(query, [med_name, day , night , id], (err, results) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Error inserting data into MySQL' });
        return;
    }
    console.log('MySQL data updated ');
    res.json({ message: 'Data updated successfully', redirect: '/medicament' }); // Redirect URL

    })
};

function deleteMedicament(req, res, next) {	

    const { id } = req.params;
    connection.query('DELETE FROM medicament WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.redirect('/medicament');
    });

};


function getMedicament(req , res){
    const { id } = req.params;
    
    connection.query('SELECT *  FROM medicament WHERE id =  ?', [id],(err, getmedicaments) => {
        if (err) throw err;
        connection.query('SELECT * FROM medicament', (err, medicaments) => {
            if (err) throw err;
        res.render('medicament', { getmedicaments: getmedicaments , table : false , addDiv : true , editDiv : false , medicaments : medicaments});
    });
});
};

module.exports = {
    getAllMedicament ,
    createMedicament,
    updateMedicament ,
    deleteMedicament,
    getMedicament
} ;