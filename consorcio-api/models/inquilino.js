// models/inquilino.js

const mongoose = require('mongoose');

const inquilinoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    unidad: {
        type: String,
        required: true,
        trim: true
    },
    tipo_unidad: {
        type: String,
        enum: ['Departamento', 'Local'],
        default: 'Departamento'
    },
    notas: {
        type: String,
        trim: true
    },
    consorcio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consorcio',
        required: true
    }
}, { timestamps: true });

const Inquilino = mongoose.model('Inquilino', inquilinoSchema);

module.exports = Inquilino;