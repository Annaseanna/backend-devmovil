module.exports = (sequelize, DataTypes) => {
    const Persona = sequelize.define('Persona', {
      idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: DataTypes.STRING,
      correo: DataTypes.STRING,
      contrasena: DataTypes.STRING,
      tipoUsuario: DataTypes.ENUM('student', 'org_edu')
    }, {});
    Persona.associate = function(models) {
      // Definir relaciones
    };
    return Persona;
  };