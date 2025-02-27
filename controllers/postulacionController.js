const Postulacion = require('../models/Postulacion');

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

// Subir documento (máx. 5MB)
exports.subirDocumento = async (req, res) => {
    try {
      const { idPostulacion } = req.params;
      const { tipoDocumento } = req.body;
  
      if (!req.file) {
        return res.status(400).json({ message: 'No se subió ningún archivo' });
      }
  
      const postulacion = await Postulacion.findById(idPostulacion);
      if (!postulacion) {
        return res.status(404).json({ message: 'Postulación no encontrada' });
      }
  
      // Asignar el archivo al campo correcto
      if (tipoDocumento === 'cartaMotivacion') {
        postulacion.cartaMotivacion = req.file.path;
      } else if (tipoDocumento === 'hojaDeVida') {
        postulacion.hojaDeVida = req.file.path;
      } else if (tipoDocumento === 'certificadoIdiomas') {
        postulacion.certificadoIdiomas = req.file.path;
      } else {
        return res.status(400).json({ message: 'Tipo de documento no válido' });
      }
  
      await postulacion.save();
      res.status(200).json({ message: 'Archivo subido correctamente', postulacion });
  
    } catch (error) {
      res.status(500).json({ message: 'Error al subir el archivo', error: error.message });
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
      postulacion.idiomas, postulacion.celular, postulacion.correoElectronico,
      postulacion.cartaMotivacion, postulacion.hojaDeVida, postulacion.certificadoIdiomas
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
      postulacion.idiomas, postulacion.celular, postulacion.correoElectronico,
      postulacion.cartaMotivacion, postulacion.hojaDeVida, postulacion.certificadoIdiomas
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
