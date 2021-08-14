const Sequelize = require('sequelize');

const path = 'mysql://root@localhost:3306/delilahdb';

const sequelize = new Sequelize(path, { operatorsAliases: false });

sequelize.authenticate()
    .then(() => {
        console.log('Conectado.');
    })
    .catch(err => {
        console.error('Error de conexion:', err);
    })
    .finally(() => {
        //sequelize.close();//no hace falta cerrar la conexion si voy a hacer consultas
    });

module.exports = sequelize;