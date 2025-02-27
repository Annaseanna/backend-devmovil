const mongoose = require('mongoose');

const ConvocatoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  descripcion: { type: String },
  requisitos: { type: String },
  promedioMinimo: { type: Number },
  nivelIdioma: { type: String },
  beneficios: { type: String },
  fechaInicio: { type: Date },
  fechaFin: { type: Date },
  estado: { type: String, enum: ['Activa', 'EnProceso', 'Finalizada'], required: true },
  creador: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona' }
});

module.exports = mongoose.model('Convocatoria', ConvocatoriaSchema);
