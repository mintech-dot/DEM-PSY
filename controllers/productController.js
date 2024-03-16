const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db connection
const connection = require('../connection/dbConnection');

function getAllproducts(req , res){
    connection.query('SELECT products.product_name as name, products.qte as quantity, products.created_at as date , users.name as username FROM products INNER JOIN users ON products.user_id = users.id; ', (err, products) => {
        if (err) throw err;
        const getproducts = []
        res.render('products', { products: products , getproducts , table : false , addDiv : false , editDiv : true});
    });
};

const createproduct = async (req, res) => {

    var name = req.body.product_name ;
    var qte = req.body.qte ;
    var source = req.body.source ;
    var created_at = req.body.created_at ;

    const query = 'INSERT INTO products (name, address , phone , type) VALUES (?, ? , ? , ?)';
    connection.query(query, [name, address , phone , type], (err, results) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Error inserting data into MySQL' });
        return;
    }
    console.log('Data inserted into MySQL');
    res.json({ message: 'Data inserted successfully', redirect: '/products' }); // Redirect URL

})
};

const updateUser = async (req, res) => {

    var id = req.body.id ;
    var name = req.body.name ;
    var address = req.body.address ;
    var phone = req.body.phone ;
    var type = req.body.type ;


    const query = 'UPDATE products SET name = ?, address = ? , phone = ?, type = ? WHERE id = ?';
    connection.query(query, [name, address , phone , type , id], (err, results) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Error inserting data into MySQL' });
        return;
    }
    console.log('MySQL data updated ');
    res.json({ message: 'Data updated successfully', redirect: '/products' }); // Redirect URL

    })
};

function deleteUser(req, res, next) {	

    const { id } = req.params;
    connection.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.redirect('/products');
    });

};


function getUser(req , res){
    const { id } = req.params;

    connection.query('SELECT *  FROM products WHERE id =  ?', [id],(err, getproducts) => {
        if (err) throw err;
        const products = [];
        res.render('products', { getproducts: getproducts , table : true , addDiv : true , editDiv : false , products : products});
    });
};

module.exports = {
    getAllproducts ,
    createproduct,
    updateUser ,
    deleteUser,
    getUser
} ;