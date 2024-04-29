const db = require('./db');

const Register = db.sequelize.define('registers', {
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
        type: db.Sequelize.DATEONLY,
        allowNull: false
    },
    badge: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: db.Sequelize.DATE,
        allowNull: false,
        defaultValue: db.Sequelize.literal('CURRENT_DATE')
    },
    hour: {
        type: db.Sequelize.TIME,
        allowNull: false,
        defaultValue: db.Sequelize.literal('CURRENT_TIME')
    },
    branch: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    users_id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    timestamps: false
});

module.exports = Register;
