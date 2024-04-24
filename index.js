// index.js
require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

// =========== Controller ===========
const userController = require('./controller/userController');

// =========== Model ===========
const Table = require('./model/registerModel');
const User = require('./model/userModel');

// =========== Default ===========
const app = express();
app.set('view engine', 'ejs');
app.set('layout', './layouts/default/main');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ================== Rotas ==================

app.get('/', (req, res) => {
    res.redirect('/auth');
});

app.get('/auth', (req, res) => {
    userController.getAuth(req, res, app);
});

app.post('/auth', (req, res) => {
    const { emission, badge } = req.body;

    if (!emission || !badge) {
        res.render("layouts/default/main", { error: "Preencha todos os campos" });
        return;
    }

    User.authenticate(emission, badge)
        .then((user) => {
            if (user) {
                Table.create({
                    emission: user.emission,
                    badge: user.badge,
                    date: new Date(),
                    hour: new Date().toLocaleTimeString(),
                    users_id: user.id
                }).then(() => {
                    res.redirect(process.env.URL_REDIRECT);
                }).catch(err => {
                    res.send("Erro ao registrar acesso: " + err);
                });
            } else {
                res.render("layouts/default/main", { error: "Usuário não autorizado!" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.send("Erro ao autenticar usuário: " + error.message);
        });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
