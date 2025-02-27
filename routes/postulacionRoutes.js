const express = require('express');
const multer = require('multer');
const router = express.Router();
const postulacionController = require('../controllers/postulacionController');

// Configuración de almacenamiento para archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

// Definir rutas
router.post('/', postulacionController.crearPostulacion);
router.post('/subirDocumento/:id', upload.single('archivo'), postulacionController.subirDocumento);
router.put('/actualizarEstado/:id', postulacionController.actualizarEstado);
router.get('/consultarProgreso/:id', postulacionController.consultarProgreso);
router.get('/', postulacionController.obtenerPostulaciones);
router.post('/:idPostulacion/upload', upload.single('archivo'), postulacionController.subirDocumento);

module.exports = router;
