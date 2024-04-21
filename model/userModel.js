const db = require('./db');

const User = db.sequelize.define('users', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true // Garante que o nome de usuário seja único
    },
    badge: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true // Garante que o crachá seja único
    }
}, {
    timestamps: false
});

// Função de autenticação
User.authenticate = function(username, badge) {
    return User.findOne({ where: { username: username, badge: badge } })
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
