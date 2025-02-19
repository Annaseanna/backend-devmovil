module.exports = (sequelize, DataTypes) => {
    const ReviewConvocatoria = sequelize.define('ReviewConvocatoria', {
      idUsuario: DataTypes.INTEGER,
      idConvocatoria: DataTypes.INTEGER,
      valoracion: DataTypes.INTEGER,
      opinion: DataTypes.STRING
    }, {});
    ReviewConvocatoria.associate = function(models) {
      ReviewConvocatoria.belongsTo(models.Persona, { foreignKey: 'idUsuario' });
      ReviewConvocatoria.belongsTo(models.Convocatoria, { foreignKey: 'idConvocatoria' });
    };
    return ReviewConvocatoria;
  };