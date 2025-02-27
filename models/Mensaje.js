const mongoose = require('mongoose');

const MensajeSchema = new mongoose.Schema({
  conversacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversacion', required: true },
  remitente: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true },
  contenido: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mensaje', MensajeSchema);
