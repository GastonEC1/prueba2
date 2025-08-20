const express = require('express');
const router = express.Router();
const Consorcio = require('../models/consorcio');
const Inquilino = require('../models/inquilino');
const Activo = require('../models/activo');

// Obtener todos los consorcios
router.get('/', async (req, res) => {
    try {
        const consorcios = await Consorcio.find();
        res.json(consorcios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener un consorcio por ID con sus inquilinos y activos
router.get('/:id', async (req, res) => {
    try {
        const consorcio = await Consorcio.findById(req.params.id)
            .populate('inquilinos') 
            .populate('activos');   

        if (!consorcio) {
            return res.status(404).json({ msg: 'Consorcio no encontrado' });
        }
        res.json(consorcio);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// Crear un nuevo consorcio
router.post('/', async (req, res) => {
    const { nombre, direccion, pisos, unidades } = req.body;
    try {
        const nuevoConsorcio = await Consorcio.create({
            nombre,
            direccion,
            pisos,
            unidades
        });
        res.status(201).json(nuevoConsorcio);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

module.exports = router;