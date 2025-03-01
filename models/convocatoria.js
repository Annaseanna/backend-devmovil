const mongoose = require('mongoose');

const ConvocatoriaSchema = new mongoose.Schema({
  idConvocatoria: { type: String, required: true, unique: true },
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
  creador: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true } // Relación con Persona
}, { timestamps: true });

module.exports = mongoose.model('Convocatoria', ConvocatoriaSchema);

//