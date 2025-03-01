const Persona = require('../models/Persona');

// Obtener todas las personas
const getPersonas = async (req, res) => {
  try {
    const personas = await Persona.find(); // Busca todas las personas en la BD
    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener personas', error });
  }
};

// Obtener una persona por ID
const getPersonaById = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }
    res.status(200).json(persona);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la persona', error });
  }
};

// Crear una nueva persona
const createPersona = async (req, res) => {
  try {
    const nuevaPersona = new Persona(req.body); // Crea una nueva instancia del modelo
    const personaGuardada = await nuevaPersona.save(); // Guarda en la BD
    res.status(201).json(personaGuardada);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la persona', error });
  }
};

// Actualizar una persona
const updatePersona = async (req, res) => {
  try {
    const personaActualizada = await Persona.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Devuelve el documento actualizado
      runValidators: true, // Valida los datos antes de actualizar
    });
    if (!personaActualizada) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }
    res.status(200).json(personaActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la persona', error });
  }
};

// Eliminar una persona
const deletePersona = async (req, res) => {
  try {
    const personaEliminada = await Persona.findByIdAndDelete(req.params.id);
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
  getPersonaById,
  createPersona,
  updatePersona,
  deletePersona,
};
