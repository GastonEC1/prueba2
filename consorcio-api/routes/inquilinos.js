// routes/inquilinos.js

const express = require('express');
const router = express.Router();
const Inquilino = require('../models/inquilino');

// GET all inquilinos
router.get('/', async (req, res) => {
    try {
        const inquilinos = await Inquilino.find().populate('consorcio');
        res.json(inquilinos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new inquilino
router.post('/', async (req, res) => {
    const inquilino = new Inquilino({
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        unidad: req.body.unidad,
        tipo_unidad: req.body.tipo_unidad,
        notas: req.body.notas,
        consorcio: req.body.consorcio
    });
    try {
        const newInquilino = await inquilino.save();
        res.status(201).json(newInquilino);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET inquilinos by consorcio ID
router.get('/consorcio/:consorcioId', async (req, res) => {
    try {
        const inquilinos = await Inquilino.find({ consorcio: req.params.consorcioId });
        res.json(inquilinos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE an inquilino
router.delete('/:id', async (req, res) => {
    try {
        const result = await Inquilino.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No se puede encontrar el inquilino' });
        }
        res.json({ message: 'Inquilino eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;