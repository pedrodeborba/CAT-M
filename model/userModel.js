// userModel.js
const db = require('./db');

const User = db.sequelize.define('users', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    admission: {
        // Tipo de dado: data 0000-00-00 (sem hora)
        type: db.Sequelize.DATEONLY,
        allowNull: false
    },
    badge: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true // Garante que o crachá seja único
    },
    branch: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
}, 
{
    timestamps: false,
});

// Função de autenticação
User.authenticate = function(admission, badge) {
    return User.findOne({ 
        where: { 
            admission: admission,
            badge: badge 
        }
    })
    .then(user => {
        if (user) {
            // Usuário autenticado
            return user;
        } else {
            // Usuário não encontrado ou crachá incorreto
            return null;
        }
    })
    .catch(error => {
        throw error;
    });
};


module.exports = User;
