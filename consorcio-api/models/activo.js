// models/activo.js

const mongoose = require('mongoose');

const activoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    marca: {
        type: String,
        trim: true
    },
    modelo: {
        type: String,
        trim: true
    },
    ubicacion: {
        type: String,
        trim: true
    },
    caracteristicas: {
        type: String,
        trim: true
    },
    fecha_instalacion: {
        type: Date
    },
    proximo_mantenimiento: {
        type: Date
    },
    ultima_recarga: {
        type: Date
    },
    consorcio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consorcio',
        required: true
    }
}, { timestamps: true });

const Activo = mongoose.model('Activo', activoSchema);

module.exports = Activo;