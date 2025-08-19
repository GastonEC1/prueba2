// models/consorcio.js

const mongoose = require('mongoose');

const consorcioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    pisos: {
        type: Number,
        required: true
    },
    unidades: {
        type: Number,
        required: true
    },
    portero_nombre: {
        type: String,
        trim: true
    },
    portero_telefono: {
        type: String,
        trim: true
    },
    portero_horario: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const Consorcio = mongoose.model('Consorcio', consorcioSchema);

module.exports = Consorcio;