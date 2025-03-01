const mongoose = require('mongoose');

const PersonaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  tipoUsuario: { type: String, enum: ['student', 'admin'], required: true }
});

module.exports = mongoose.model('Persona', PersonaSchema);

//