const express = require('express');
const alumnoController = require('../controllers/alumnoController');
const router = express.Router();

// Ruta para obtener todos los alumnos
router.get('/', alumnoController.getAllAlumnos);

// Ruta para buscar un alumno por ID
router.get('/buscar', alumnoController.getAlumnoById);

// Ruta para crear un nuevo alumno
router.post('/crear', alumnoController.createAlumno);

// Ruta para actualizar un alumno
router.put('/actualizar', alumnoController.updateAlumno);

// Ruta para eliminar un alumno
router.delete('/eliminar', alumnoController.deleteAlumno);

module.exports = router;
