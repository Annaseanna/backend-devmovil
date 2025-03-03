const mongoose = require('mongoose');

const PostulacionSchema = new mongoose.Schema({
  correoElectronico: { type: String, required: true, index: true }, // Se usa para búsqueda
  idConvocatoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Convocatoria', required: true },
  estado: { type: String, enum: ['En Progreso', 'Completada', 'Rechazada'], default: 'En Progreso' },
  promedio: { type: Number, required: true },
  porcentajeAvance: { type: Number, default: 0 },
  carrera: { type: String, required: true },
  idiomas: { type: String, required: true },
  celular: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Postulacion', PostulacionSchema);
