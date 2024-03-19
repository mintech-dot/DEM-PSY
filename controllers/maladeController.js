const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db connection
const connection = require('../connection/dbConnection');

function getAllMalade(req , res){
    connection.query('SELECT * FROM malade', (err, malades) => {
        if (err) throw err;
        const getmalades = [] ;
        res.render('malade', { malades: malades , getmalades , table : false , addDiv : false , editDiv : true});
    });
};

const createMalade = async (req, res) => {

    var name = req.body.name ;
    var maladie = req.body.maladie ;
    var phone = req.body.phone ;
    var place = req.body.place ;
    var famille = req.body.famille ;
    var date = req.body.date ;
    var doctor = req.body.doctor ;
    var notes = req.body.notes ;

    const query = 'INSERT INTO malade (name, maladie, phone, place, famille, date, doctor, notes) VALUES (?, ? , ? , ? , ?, ? , ? , ?)';
    connection.query(query, [name, maladie , phone , place, famille , date , doctor , notes], (err, results) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Error inserting data into MySQL' });
        return;
    }
    console.log('Data inserted into MySQL');
    res.json({ message: 'Data inserted successfully', redirect: '/malade' }); // Redirect URL

})
};

const updateMalade = async (req, res) => {

    var id = req.body.id ;
    var name = req.body.name ;
    var maladie = req.body.maladie ;
    var phone = req.body.phone ;
    var place = req.body.place ;
    var famille = req.body.famille ;
    var date = req.body.date ;
    var doctor = req.body.doctor ;
    var notes = req.body.notes ;


    const query = 'UPDATE malade SET name = ?, maladie = ? , phone = ?, place = ? , famille = ?, date = ?, doctor = ?, notes = ? WHERE id = ?';
    connection.query(query, [name, maladie , phone , place, famille , date , doctor , notes , id], (err, results) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Error inserting data into MySQL' });
        return;
    }
    console.log('MySQL data updated ');
    res.json({ message: 'Data updated successfully', redirect: '/malade' }); // Redirect URL

    })
};

function deleteMalade(req, res, next) {	

    const { id } = req.params;
    connection.query('DELETE FROM malade WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.redirect('/malade');
    });

};


function getMalade(req , res){
    const { id } = req.params;
    
    connection.query('SELECT *  FROM malade WHERE id =  ?', [id],(err, getmalades) => {
        if (err) throw err;
        connection.query('SELECT * FROM malade', (err, malades) => {
            if (err) throw err;
        res.render('malade', { getmalades: getmalades , table : false , addDiv : true , editDiv : false , malades : malades});
    });
});
};

module.exports = {
    getAllMalade ,
    createMalade,
    updateMalade ,
    deleteMalade,
    getMalade
} ;