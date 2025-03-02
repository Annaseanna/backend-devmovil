const Convocatoria = require('../models/Convocatoria');

// Crear nueva convocatoria
exports.crearConvocatoria = async (req, res) => {
  try {
    const {nombre, tipo, descripcion, requisitos, promedioMinimo, nivelIdioma, beneficios, fechaInicio, fechaFin, estado} = req.body;
    
    const nuevaConvocatoria = new Convocatoria({
      nombre,
      tipo,
      descripcion,
      requisitos,
      promedioMinimo,
      nivelIdioma,
      beneficios,
      fechaInicio,
      fechaFin,
      estado
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
    const convocatorias = await Convocatoria.find();
    res.status(200).json(convocatorias);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener convocatorias', error });
  }
};

// Actualizar convocatoria por nombre
exports.actualizarConvocatoria = async (req, res) => {
  try {
    const convocatoriaActualizada = await Convocatoria.findOneAndUpdate({ nombre: req.params.nombre }, req.body, { new: true });
    res.status(200).json(convocatoriaActualizada);
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar la convocatoria', error });
  }
};

// Eliminar convocatoria por nombre
exports.eliminarConvocatoria = async (req, res) => {
  try {
    await Convocatoria.findOneAndDelete({ nombre: req.params.nombre });
    res.status(200).json({ msg: 'Convocatoria eliminada' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar la convocatoria', error });
  }
};
