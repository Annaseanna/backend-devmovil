const express = require('express');
const router = express.Router();
const postulacionController = require('../controllers/postulacionController');

// Definir rutas
router.post('/', postulacionController.crearPostulacion);
router.put('/actualizarEstado/:id', postulacionController.actualizarEstado);
router.get('/consultarProgreso/:id', postulacionController.consultarProgreso);
router.get('/', postulacionController.obtenerPostulaciones);
router.get('/usuario/correo/:correoElectronico', postulacionController.obtenerPostulacionesPorCorreo);
router.get('/convocatoria/:idConvocatoria', postulacionController.obtenerPostulacionesPorConvocatoria);


module.exports = router;
