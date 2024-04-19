function getAuth(req, res, app){
    app.set('layout', './layouts/default/main');
    res.render('auth', {erro:null});
}

module.exports = { getAuth };