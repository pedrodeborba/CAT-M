require ('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_USER_PASS, {
    host: process.env.DB_HOST, 
    dialect: process.env.DB_DIALECT,
})

sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!");
}).catch(function(err){
    console.log("Erro na conexão: "+ err);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
}