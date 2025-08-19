// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a la base de datos de MongoDB'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));


// Importar Rutas
const consorciosRouter = require('./routes/consorcios');
const inquilinosRouter = require('./routes/inquilinos');
const activosRouter = require('./routes/activos');


// Usar Rutas
app.use('/api/consorcios', consorciosRouter); // Línea corregida aquí
app.use('/api/inquilinos', inquilinosRouter);
app.use('/api/activos', activosRouter);


// Rutas de bienvenida
app.get('/', (req, res) => {
  res.send('API de Gestión de Consorcios en funcionamiento');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor de la API funcionando en el puerto ${PORT}`);
});