module.exports = (sequelize, DataTypes) => {
    const Postulacion = sequelize.define('Postulacion', {
      idPostulacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idUsuario: DataTypes.INTEGER,
      idConvocatoria: DataTypes.INTEGER,
      estado: DataTypes.ENUM('enProgreso', 'completada', 'rechazada')
    }, {});
    Postulacion.associate = function(models) {
      Postulacion.belongsTo(models.Persona, { foreignKey: 'idUsuario' });
      Postulacion.belongsTo(models.Convocatoria, { foreignKey: 'idConvocatoria' });
    };
    return Postulacion;
  };
  