const Convocatoria = require('../models/Convocatoria');
const Persona = require('../models/Persona');

// Crear nueva convocatoria (solo admins pueden hacerlo)
exports.crearConvocatoria = async (req, res) => {
  try {
    const { idConvocatoria, nombre, tipo, descripcion, requisitos, promedioMinimo, nivelIdioma, beneficios, fechaInicio, fechaFin, estado } = req.body;
    const usuario = await Persona.findById(req.user.id);

    if (!usuario || usuario.tipoUsuario !== 'admin') {
      return res.status(403).json({ msg: 'No tienes permisos para crear convocatorias' });
    }

    const nuevaConvocatoria = new Convocatoria({
      idConvocatoria,
      nombre,
      tipo,
      descripcion,
      requisitos,
      promedioMinimo,
      nivelIdioma,
      beneficios,
      fechaInicio,
      fechaFin,
      estado,
      creador: req.user.id
    });

    await nuevaConvocatoria.save();
    res.status(201).json(nuevaConvocatoria);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear la convocatoria', error });
  }
};

// Obtener todas las convocatorias
exports.obtenerConvocatorias = async (req, res) => {
  try {
    const convocatorias = await Convocatoria.find().populate('creador', 'nombre correo');
    res.status(200).json(convocatorias);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener convocatorias', error });
  }
};

// Actualizar convocatoria (solo admins pueden hacerlo)
exports.actualizarConvocatoria = async (req, res) => {
  try {
    const usuario = await Persona.findById(req.user.id);
    if (!usuario || usuario.tipoUsuario !== 'admin') {
      return res.status(403).json({ msg: 'No tienes permisos para actualizar convocatorias' });
    }

    const convocatoriaActualizada = await Convocatoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(convocatoriaActualizada);
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar la convocatoria', error });
  }
};

// Eliminar convocatoria (solo admins pueden hacerlo)
exports.eliminarConvocatoria = async (req, res) => {
  try {
    const usuario = await Persona.findById(req.user.id);
    if (!usuario || usuario.tipoUsuario !== 'admin') {
      return res.status(403).json({ msg: 'No tienes permisos para eliminar convocatorias' });
    }

    await Convocatoria.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Convocatoria eliminada' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar la convocatoria', error });
  }
};

