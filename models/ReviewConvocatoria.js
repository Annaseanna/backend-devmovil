const mongoose = require('mongoose');

const ReviewConvocatoriaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true },
  convocatoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Convocatoria', required: true },
  valoracion: { type: Number, min: 1, max: 5, required: true },
  opinion: { type: String }
});

module.exports = mongoose.model('ReviewConvocatoria', ReviewConvocatoriaSchema);
