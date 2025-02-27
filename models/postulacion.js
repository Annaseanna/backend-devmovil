const mongoose = require('mongoose');

const PostulacionSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true },
  convocatoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Convocatoria', required: true },
  estado: { type: String, enum: ['enProgreso', 'completada', 'rechazada'], required: true }
});

module.exports = mongoose.model('Postulacion', PostulacionSchema);
