const Persona = require('../models/Persona');

// Obtener una persona por correo
const getPersonaByCorreo = async (req, res) => {
  try {
    const { correo } = req.query;
    if (!correo) {
      return res.status(400).json({ message: 'Se requiere un correo para la búsqueda' });
    }

    const persona = await Persona.findOne({ correo });
    if (!persona) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }

    res.status(200).json(persona);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la persona', error });
  }
};

// Obtener todas las personas
const getPersonas = async (req, res) => {
  try {
    const personas = await Persona.find();
    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener personas', error });
  }
};

// Crear una nueva persona
const createPersona = async (req, res) => {
  try {
    const nuevaPersona = new Persona(req.body);
    const personaGuardada = await nuevaPersona.save();
    res.status(201).json(personaGuardada);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la persona', error });
  }
};

const updatePersona = async (req, res) => {
  try {
    const { correo } = req.query;
    if (!correo) {
      return res.status(400).json({ message: 'Se requiere un correo para la actualización' });
    }

    const personaActualizada = await Persona.findOneAndUpdate(
      { correo }, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!personaActualizada) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }

    res.status(200).json(personaActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la persona', error });
  }
};

const deletePersona = async (req, res) => {
  try {
    const { correo } = req.query;
    if (!correo) {
      return res.status(400).json({ message: 'Se requiere un correo para la eliminación' });
    }

    const personaEliminada = await Persona.findOneAndDelete({ correo });
    if (!personaEliminada) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }

    res.status(200).json({ message: 'Persona eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la persona', error });
  }
};

// Exportamos los controladores
module.exports = {
  getPersonas,
  getPersonaByCorreo,
  createPersona,
  updatePersona,
  deletePersona,
};
