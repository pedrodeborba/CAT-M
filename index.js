require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

// =========== Controller ===========
const authController = require ('./controller/auth');

// =========== Model ===========
const Table = require('./model/registerModel');

const app = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');
app.set('layout', './layouts/default/main');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.redirect('/auth');
});

app.get('/auth', (req,res) => {
    authController.getAuth(req,res,app); 
});

app.post('/logado', (req,res) => {
    Table.create({
        name: req.body.name,
        badge: req.body.badge,
        date: req.body.date,
        hour: req.body.hour
    }).then(function(){
        res.send("Registro efetuado com sucesso!");
    }).catch(function(err){
        res.send("Erro ao registrar: "+err);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});