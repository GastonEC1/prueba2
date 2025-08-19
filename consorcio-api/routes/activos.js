// routes/activos.js

const express = require('express');
const router = express.Router();
const Activo = require('../models/activo');

// GET all activos
router.get('/', async (req, res) => {
    try {
        const activos = await Activo.find().populate('consorcio');
        res.json(activos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new activo
router.post('/', async (req, res) => {
    const activo = new Activo({
        nombre: req.body.nombre,
        marca: req.body.marca,
        modelo: req.body.modelo,
        ubicacion: req.body.ubicacion,
        caracteristicas: req.body.caracteristicas,
        fecha_instalacion: req.body.fecha_instalacion,
        proximo_mantenimiento: req.body.proximo_mantenimiento,
        ultima_recarga: req.body.ultima_recarga,
        consorcio: req.body.consorcio
    });
    try {
        const newActivo = await activo.save();
        res.status(201).json(newActivo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET activos by consorcio ID
router.get('/consorcio/:consorcioId', async (req, res) => {
    try {
        const activos = await Activo.find({ consorcio: req.params.consorcioId });
        res.json(activos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE an activo
router.delete('/:id', async (req, res) => {
    try {
        const result = await Activo.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No se puede encontrar el activo' });
        }
        res.json({ message: 'Activo eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;