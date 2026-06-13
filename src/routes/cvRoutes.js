const express = require('express');
const router = express.Router();


const cvController = require('../controllers/cvController');
const proyectosController = require('../controllers/proyectosController');

router.get('/cv', cvController.getEntireCV);

router.get('/proyectos', proyectosController.getAll);
router.get('/proyectos/:id', proyectosController.getById);
router.post('/proyectos', proyectosController.create);
router.put('/proyectos/:id', proyectosController.update);
router.delete('/proyectos/:id', proyectosController.delete);

module.exports = router;