// userController.js
const User = require("../model/userModel");

function getAuth(req, res, app) {
    app.set('layout', './layouts/default/main');
    res.render('auth', {error:null});
}

async function authenticate(req, res) {
  const { admission, badge } = req.body;

  console.log("Dados recebidos:", admission, badge); // Adicionado para verificar se os dados estão corretos

  // Verifica se algum dos campos está vazio
  if (!admission || !badge) {
      res.render("auth", { error: "Preencha todos os campos" });
      return;
  }

  // Autenticar o usuário fornecendo os parâmetros como um único objeto
  User.authenticate(admission, badge)
      .then((user) => {
          if (user) {
              // Verificação bem sucedida
              req.session.user = {
                  id: user.id,
                  badge: user.badge,
              };
              res.redirect("/auth");
          } else {
              res.render("auth", { error: "Credenciais inválidas" });
          }
      })
      .catch((error) => {
          console.error(error);
          res.render("auth", { error: "Erro ao autenticar" });
      });
}


module.exports = { getAuth, authenticate };
