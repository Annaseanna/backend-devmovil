module.exports = (sequelize, DataTypes) => {
    const Convocatoria = sequelize.define('Convocatoria', {
      idConvocatoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: DataTypes.STRING,
      tipo: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      requisitos: DataTypes.STRING,
      promedioMinimo: DataTypes.FLOAT,
      nivelIdioma: DataTypes.STRING,
      beneficios: DataTypes.STRING,
      fechaInicio: DataTypes.DATE,
      fechaFin: DataTypes.DATE,
      estado: DataTypes.ENUM('Activa', 'EnProceso', 'Finalizada')
    }, {});
    Convocatoria.associate = function(models) {
      Convocatoria.belongsTo(models.Coordinador, { foreignKey: 'idUsuario' });
    };
    return Convocatoria;
  };
  