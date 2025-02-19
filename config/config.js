require('dotenv').config(); // Cargar variables de entorno desde .env

module.exports = {
  development: {
    "username": "postgres",
    "password": "root",
    "database": "backend_movil",
    "host": "localhost",
    "port": "5432",
    "dialect": "postgres"
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
