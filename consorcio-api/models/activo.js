const mongoose = require('mongoose');

const activoSchema = new mongoose.Schema({
    nombre: String,
    marca: String,
    modelo: String,
    ubicacion: String,
    // Esta referencia es necesaria para vincularlo a un consorcio
    consorcio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consorcio'
    }
});

module.exports = mongoose.model('Activo', activoSchema);