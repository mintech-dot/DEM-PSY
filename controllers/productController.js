const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db connection
const connection = require('../connection/dbConnection');

function getAllProduct(req , res){
    connection.query('SELECT * FROM product', (err, products) => {
        if (err) throw err;
        const getproducts = [] ;
        res.render('product', { products: products , getproducts , table : false , addDiv : false , editDiv : true});
    });
};

const createProduct = async (req, res) => {

    var product = req.body.name ;
    var qte = req.body.qte ;
    var date = req.body.date ;
    var situation = req.body.situation ;
   

    const query = 'INSERT INTO product (product, qte, date , situation) VALUES (?, ? , ? , ?)';
    connection.query(query, [product, qte , date , situation ], (err) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Error inserting data into MySQL' });
        return;
    }
    console.log('Data inserted into MySQL');
    res.json({ message: 'Data inserted successfully', redirect: '/product' }); // Redirect URL

})
};

const updateProduct = async (req, res) => {

    var id = req.body.id ;
    var product = req.body.name ;
    var qte = req.body.qte ;
    var date = req.body.date ;
    var situation = req.body.situation ;
   


    const query = 'UPDATE product SET product = ?, qte = ? , date = ?  , situation = ? WHERE id = ?';
    connection.query(query, [product, qte , date , situation , id], (err) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Error inserting data into MySQL' });
        return;
    }
    console.log('MySQL data updated ');
    res.json({ message: 'Data updated successfully', redirect: '/product' }); // Redirect URL

    })
};

function deleteProduct(req, res) {	

    const { id } = req.params;
    connection.query('DELETE FROM product WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.redirect('/product');
    });

};


function getProduct(req , res){
    const { id } = req.params;
    
    connection.query('SELECT *  FROM product WHERE id =  ?', [id],(err, getproducts) => {
        if (err) throw err;
        connection.query('SELECT * FROM product', (err, products) => {
            if (err) throw err;
        res.render('product', { getproducts: getproducts , table : false , addDiv : true , editDiv : false , products : products});
    });
});
};

module.exports = {
    getAllProduct ,
    createProduct,
    updateProduct ,
    deleteProduct,
    getProduct
} ;