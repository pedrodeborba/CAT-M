const User = require("../model/userModel");

function getAuth(req, res, app){
    app.set('layout', './layouts/default/main');
    res.render('auth', {error:null});
}

async function authenticate(req, res) {
  const username = req.body.username;
  const badge = req.body.badge;

  if (!username || !badge) {
    res.render("layouts/default/main", { error: "Preencha todos os campos" });
  }

  User.authenticate(username, badge)
    .then((user) => {
      if (user) {
        //Verificação bem sucedida
        req.session.user = {
          id: user.id,
          username: user.username,
        };
        res.redirect("/logado");
      } else {
        res.render("auth", { error: "Credenciais inválidas" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.render("auth", { error: "Erro ao autenticar" });
    });
}

module.exports = { getAuth, authenticate};