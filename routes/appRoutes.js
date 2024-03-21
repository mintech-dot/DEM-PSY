var express = require('express');
const authController = require('../controllers/authController');
const maladeController = require('../controllers/maladeController');
const medicamentController = require('../controllers/medicamentController');
const productController = require('../controllers/productController');
const bodyParser = require('body-parser');
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define your routes after configuring body-parser


app.post('/auth', authController.auth);
app.get('/' , authController.home) ;
app.get('/dashboard' , authController.dashboard) ;

app.get('/malade' , maladeController.getAllMalade );
app.post('/addmalade', maladeController.createMalade);
app.post('/malades/:id/edit', maladeController.updateMalade);
app.get('/malades/:id/', maladeController.getMalade);
app.get('/malades/:id/delete', maladeController.deleteMalade);


app.get('/medicament' , medicamentController.getAllMedicament );
app.post('/addmedicament', medicamentController.createMedicament);
app.post('/medicaments/:id/edit', medicamentController.updateMedicament);
app.get('/medicaments/:id/', medicamentController.getMedicament);
app.get('/medicaments/:id/delete', medicamentController.deleteMedicament);

app.get('/product' , productController.getAllProduct );
app.post('/addproduct', productController.createProduct);
app.post('/products/:id/edit', productController.updateProduct);
app.get('/products/:id/', productController.getProduct);
app.get('/products/:id/delete', productController.deleteProduct);
module.exports = app;
