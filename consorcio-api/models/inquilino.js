const mongoose = require('mongoose');

const inquilinoSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    telefono: String,
    unidad: String,
    consorcio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consorcio' // <-- Referencia al modelo Consorcio
    }
});

module.exports = mongoose.model('Inquilino', inquilinoSchema);