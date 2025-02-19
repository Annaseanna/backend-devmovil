const { Persona } = require('../models');

const PersonaController = {
  async create(req, res) {
    try {
      const { nombre, correo, contrasena, tipoUsuario } = req.body;
      if (!['student', 'org_edu'].includes(tipoUsuario)) {
        return res.status(400).json({ message: 'Tipo de usuario inválido' });
      }
      const persona = await Persona.create({ nombre, correo, contrasena, tipoUsuario });
      res.status(201).json(persona);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la persona', error });
    }
  },

  async getAll(req, res) {
    try {
      const personas = await Persona.findAll();
      res.json(personas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener personas', error });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const persona = await Persona.findByPk(id);
      if (!persona) {
        return res.status(404).json({ message: 'Persona no encontrada' });
      }
      res.json(persona);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la persona', error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre, correo, contrasena, tipoUsuario } = req.body;
      const persona = await Persona.findByPk(id);
      if (!persona) {
        return res.status(404).json({ message: 'Persona no encontrada' });
      }
      await persona.update({ nombre, correo, contrasena, tipoUsuario });
      res.json(persona);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la persona', error });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const persona = await Persona.findByPk(id);
      if (!persona) {
        return res.status(404).json({ message: 'Persona no encontrada' });
      }
      await persona.destroy();
      res.json({ message: 'Persona eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la persona', error });
    }
  }
};

module.exports = PersonaController;
