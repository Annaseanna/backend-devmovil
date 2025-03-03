const Postulacion = require('../models/Postulacion');
const Usuario = require('../models/Persona');

// Crear postulación
exports.crearPostulacion = async (req, res) => {
  try {
    const nuevaPostulacion = new Postulacion(req.body);
    await nuevaPostulacion.save();
    res.status(201).json(nuevaPostulacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar estado de la postulación
exports.actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const postulacion = await Postulacion.findById(id);
    if (!postulacion) return res.status(404).json({ error: 'Postulación no encontrada' });

    const camposRequeridos = [
      postulacion.promedio, postulacion.porcentajeAvance, postulacion.carrera,
      postulacion.idiomas, postulacion.celular, postulacion.correoElectronico
    ];
    
    const completados = camposRequeridos.filter(field => field !== undefined && field !== null).length;

    if (completados === camposRequeridos.length) {
      postulacion.estado = 'Completada';
    }

    await postulacion.save();
    res.json({ mensaje: 'Estado actualizado', estado: postulacion.estado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Consultar progreso de la postulación
exports.consultarProgreso = async (req, res) => {
  try {
    const { id } = req.params;
    const postulacion = await Postulacion.findById(id);
    if (!postulacion) return res.status(404).json({ error: 'Postulación no encontrada' });

    const camposRequeridos = [
      postulacion.promedio, postulacion.porcentajeAvance, postulacion.carrera,
      postulacion.idiomas, postulacion.celular, postulacion.correoElectronico
    ];
    
    const completados = camposRequeridos.filter(field => field !== undefined && field !== null).length;
    
    const progreso = (completados / camposRequeridos.length) * 100;
    res.json({ progreso: `${progreso}%` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las postulaciones
exports.obtenerPostulaciones = async (req, res) => {
  try {
    const postulaciones = await Postulacion.find();
    res.json(postulaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una postulación
exports.eliminarPostulacion = async (req, res) => {
  try {
    const { id } = req.params;
    const postulacionEliminada = await Postulacion.findByIdAndDelete(id);
    
    if (!postulacionEliminada) {
      return res.status(404).json({ msg: 'Postulación no encontrada' });
    }

    res.status(200).json({ msg: 'Postulación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar la postulación', error: error.message });
  }
};

// Obtener postulaciones por correo del usuario
exports.obtenerPostulacionesPorCorreo = async (req, res) => {
  try {
    const { correoElectronico } = req.params;

    // Buscar postulaciones del usuario basado en su correo
    const postulaciones = await Postulacion.find({ correoElectronico })
      .populate({
        path: 'idConvocatoria', // Referencia a la convocatoria asociada
        select: 'nombre descripcion pais' // Solo traer estos campos de la convocatoria
      })
      .select('estado'); // Seleccionar solo el estado de la postulación

    if (!postulaciones.length) {
      return res.status(404).json({ msg: 'No se encontraron postulaciones para este correo' });
    }

    // Formatear la respuesta con los campos deseados
    const resultado = postulaciones.map(postulacion => ({
      nombreConvocatoria: postulacion.idConvocatoria?.nombre || 'No disponible',
      descripcion: postulacion.idConvocatoria?.descripcion || 'No disponible',
      pais: postulacion.idConvocatoria?.pais || 'No disponible',
      estado: postulacion.estado
    }));

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las postulaciones', error: error.message });
  }
};


exports.obtenerPostulacionesPorConvocatoria = async (req, res) => {
  try {
    const { idConvocatoria } = req.params;

    // Buscar postulaciones asociadas a la convocatoria
    const postulaciones = await Postulacion.find({ idConvocatoria })
      .populate({
        path: 'correoElectronico', // Obtener los datos del usuario
        select: 'nombre' // Traer solo el nombre y el correo
      })
      .select('promedio'); // Seleccionar solo el promedio de la postulación

    if (!postulaciones.length) {
      return res.status(404).json({ msg: 'No hay postulaciones para esta convocatoria' });
    }

    // Formatear la respuesta con los datos requeridos
    const resultado = postulaciones.map(postulacion => ({
      nombre: postulacion.correoElectronico?.nombre || 'No disponible',
      correo: postulacion.correoElectronico,
      promedio: postulacion.promedio
    }));

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las postulaciones', error: error.message });
  }
};
