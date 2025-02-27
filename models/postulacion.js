const mongoose = require('mongoose');

const PostulacionSchema = new mongoose.Schema({
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  idConvocatoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Convocatoria', required: true },
  estado: { type: String, enum: ['En Progreso', 'Completada', 'Rechazada'], default: 'En Progreso' },
  promedio: { type: Number, required: true },
  porcentajeAvance: { type: Number, default: 0 },
  carrera: { type: String, required: true },
  idiomas: { type: String, required: true },
  celular: { type: String, required: true },
  correoElectronico: { type: String, required: true },
  cartaMotivacion: { type: String }, // Guardamos la ruta del archivo
  hojaDeVida: { type: String },
  certificadoIdiomas: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Postulacion', PostulacionSchema);
