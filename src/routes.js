const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
//Essa expressao permite criar e registrar rotas para o nosso servidor express.
const routes = express.Router();
//_____________________________________________________________________________


const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');


routes.get('/boxes/:id', BoxController.show);

routes.post('/boxes', BoxController.store);

routes.post('/boxes/:id/files', multer(multerConfig).single('file') , FileController.store);



module.exports = routes;