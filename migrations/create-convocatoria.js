module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Convocatorias', {
        idConvocatoria: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nombre: Sequelize.STRING,
        tipo: Sequelize.STRING,
        descripcion: Sequelize.STRING,
        requisitos: Sequelize.STRING,
        promedioMinimo: Sequelize.FLOAT,
        nivelIdioma: Sequelize.STRING,
        beneficios: Sequelize.STRING,
        fechaInicio: Sequelize.DATE,
        fechaFin: Sequelize.DATE,
        estado: Sequelize.ENUM('Activa', 'EnProceso', 'Finalizada'),
        idUsuario: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Personas',
            key: 'idUsuario'
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Convocatorias');
    }
  };
  