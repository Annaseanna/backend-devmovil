module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Personas', {
        idUsuario: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nombre: Sequelize.STRING,
        correo: Sequelize.STRING,
        contrasena: Sequelize.STRING,
        tipoUsuario: Sequelize.ENUM('student', 'org_edu'),
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
      await queryInterface.dropTable('Personas');
    }
  };
  