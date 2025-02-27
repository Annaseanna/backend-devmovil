const express = require('express');
const router = express.Router();
const convocatoriaController = require('../controllers/convocatoriaController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para autenticación

// Rutas protegidas para administradores
router.post('/', authMiddleware, convocatoriaController.crearConvocatoria);
router.put('/:id', authMiddleware, convocatoriaController.actualizarConvocatoria);
router.delete('/:id', authMiddleware, convocatoriaController.eliminarConvocatoria);
router.get('/:id/candidatos', authMiddleware, convocatoriaController.obtenerCandidatos);

// Rutas públicas
router.get('/', convocatoriaController.obtenerConvocatorias);

module.exports = router;
