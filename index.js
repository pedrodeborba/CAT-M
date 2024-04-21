require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

// =========== Controller ===========
const userController = require('./controller/userController');

// =========== Model ===========
const Table = require('./model/registerModel');
const User = require('./model/userModel');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('layout', './layouts/default/main');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.redirect('/auth');
});

app.get('/auth', (req, res) => {
    userController.getAuth(req, res, app);
});

app.post('/logado', (req, res) => {
    const username = req.body.username;
    const badge = req.body.badge;

    if (!username || !badge) {
        res.render("layouts/default/main", { error: "Preencha todos os campos" });
        return;
    }

    // Verificar se o usuário existe
    User.authenticate(username, badge)
        .then((user) => {
            if (user) {
                // Criar um registro de acesso para o usuário
                Table.create({
                    username: user.username,
                    badge: user.badge,
                    date: new Date(),
                    hour: new Date().toLocaleTimeString(),
                    users_id: user.id
                }).then(() => {
                    res.send("Registro de acesso efetuado com sucesso!");
                }).catch(err => {
                    res.send("Erro ao registrar acesso: " + err);
                });
            } else {
                res.render("layouts/default/main", { error: "Usuário não autorizado!" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.send("Erro ao autenticar usuário.");
        });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
