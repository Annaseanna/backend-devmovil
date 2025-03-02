const express = require('express');
const router = express.Router();
const convocatoriaController = require('../controllers/convocatoriaController');

// Rutas para convocatorias
router.post('/', convocatoriaController.crearConvocatoria);
router.put('/:nombre', convocatoriaController.actualizarConvocatoria);
router.delete('/:nombre', convocatoriaController.eliminarConvocatoria);
router.get('/', convocatoriaController.obtenerConvocatorias);

module.exports = router;
