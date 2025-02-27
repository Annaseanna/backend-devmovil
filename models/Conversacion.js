const mongoose = require('mongoose');

const ConversacionSchema = new mongoose.Schema({
  usuarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Persona' }],
  mensajes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mensaje' }]
});

module.exports = mongoose.model('Conversacion', ConversacionSchema);
