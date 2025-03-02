const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');

// Definir rutas
router.get('/', personaController.getPersonas);
router.get('/buscar', personaController.getPersonaByCorreo);  
router.post('/', personaController.createPersona);
router.put('/actualizar', personaController.updatePersona); 
router.delete('/eliminar', personaController.deletePersona); 

module.exports = router;
