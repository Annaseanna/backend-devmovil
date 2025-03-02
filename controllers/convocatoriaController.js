const mongoose = require('mongoose');
const Convocatoria = require('../models/Convocatoria');

// Crear nueva convocatoria
exports.crearConvocatoria = async (req, res) => {
  try {
    const {idConvocatoria, nombre, tipo, descripcion, requisitos, promedioMinimo, nivelIdioma, beneficios, fechaInicio, fechaFin, estado} = req.body;
    
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


exports.actualizarConvocatoria = async (req, res) => {
  try {
    const convocatoriaActualizada = await Convocatoria.findOneAndUpdate(
      { idConvocatoria: req.params.idConvocatoria },  
      req.body, 
      { new: true } 
    );

    if (!convocatoriaActualizada) {
      return res.status(404).json({ msg: 'Convocatoria no encontrada' });
    }

    res.status(200).json(convocatoriaActualizada);
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar la convocatoria', error });
  }
};

exports.eliminarConvocatoria = async (req, res) => {
  try {
    const convocatoriaEliminada = await Convocatoria.findOneAndDelete(
      { idConvocatoria: req.params.idConvocatoria }  
    );

    if (!convocatoriaEliminada) {
      return res.status(404).json({ msg: 'Convocatoria no encontrada' });
    }

    res.status(200).json({ msg: 'Convocatoria eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar la convocatoria', error: error.message });
  }
};