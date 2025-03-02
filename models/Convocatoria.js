const mongoose = require('mongoose');

const ConvocatoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  descripcion: { type: String, required: true },
  requisitos: { type: String, required: true },
  promedioMinimo: { type: Number, required: true },
  nivelIdioma: { type: String, required: true },
  beneficios: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  estado: { 
    type: String, 
    enum: ['Activa', 'RevisionSolicitudes', 'Finalizada'], 
    default: 'Activa' 
  },
}, { timestamps: true });

module.exports = mongoose.model('Convocatoria', ConvocatoriaSchema);