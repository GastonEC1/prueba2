// routes/consorcios.js

const express = require('express');
const router = express.Router();
const Consorcio = require('../models/consorcio');

// GET all consorcios
router.get('/', async (req, res) => {
    try {
        const consorcios = await Consorcio.find();
        res.json(consorcios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one consorcio
router.get('/:id', getConsorcio, (req, res) => {
    res.json(res.consorcio);
});

// POST a new consorcio
router.post('/', async (req, res) => {
    const consorcio = new Consorcio({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        pisos: req.body.pisos,
        unidades: req.body.unidades,
        portero_nombre: req.body.portero_nombre,
        portero_telefono: req.body.portero_telefono,
        portero_horario: req.body.portero_horario
    });
    try {
        const newConsorcio = await consorcio.save();
        res.status(201).json(newConsorcio);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH a consorcio
router.patch('/:id', getConsorcio, async (req, res) => {
    if (req.body.nombre != null) {
        res.consorcio.nombre = req.body.nombre;
    }
    // Repetir para los demás campos...
    try {
        const updatedConsorcio = await res.consorcio.save();
        res.json(updatedConsorcio);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a consorcio
router.delete('/:id', getConsorcio, async (req, res) => {
    try {
        await Consorcio.deleteOne({ _id: req.params.id });
        res.json({ message: 'Consorcio eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get consorcio by ID
async function getConsorcio(req, res, next) {
    let consorcio;
    try {
        consorcio = await Consorcio.findById(req.params.id);
        if (consorcio == null) {
            return res.status(404).json({ message: 'No se puede encontrar el consorcio' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.consorcio = consorcio;
    next();
}

module.exports = router;