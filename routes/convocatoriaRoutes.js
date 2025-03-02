const express = require('express');
const router = express.Router();
const convocatoriaController = require('../controllers/convocatoriaController');

// Rutas protegidas para administradores
router.post('/', convocatoriaController.crearConvocatoria);
router.put('/:id', convocatoriaController.actualizarConvocatoria);
router.delete('/:id', convocatoriaController.eliminarConvocatoria);

// Rutas públicas
router.get('/', convocatoriaController.obtenerConvocatorias);

module.exports = router;
