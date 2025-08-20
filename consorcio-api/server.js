const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
    origin: 'https://solid-umbrella-p4vr965jp5v39p96-3000.app.github.dev',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado a la base de datos de MongoDB');
    loadTestData();
  })
  .catch(err => console.error('Error al conectar con la base de datos:', err));

// Importar Modelos
const Consorcio = require('./models/consorcio');
const Inquilino = require('./models/inquilino');
const Activo = require('./models/activo');
const User = require('./models/user');

// Cargar datos de prueba si la base de datos está vacía
async function loadTestData() {
  try {
    const consorciosCount = await Consorcio.countDocuments();
    if (consorciosCount === 0) {
      console.log('Base de datos vacía. Creando datos de prueba...');

      // 1. Crear Consorcios
      const consorcio1 = await Consorcio.create({
        nombre: 'Edificio Los Laureles',
        direccion: 'Av. Corrientes 1234',
        pisos: 10,
        unidades: 20
      });
      const consorcio2 = await Consorcio.create({
        nombre: 'Residencia El Sol',
        direccion: 'Calle Falsa 123',
        pisos: 5,
        unidades: 15
      });

      // 2. Crear Inquilinos y Activos, vinculándolos a un Consorcio
      const inquilino1 = await Inquilino.create({
        nombre: 'Juan Pérez',
        email: 'juan.perez@example.com',
        telefono: '1111-2222',
        unidad: '3B',
        consorcio: consorcio1._id
      });
      const inquilino2 = await Inquilino.create({
        nombre: 'María Gómez',
        email: 'maria.gomez@example.com',
        telefono: '3333-4444',
        unidad: '2A',
        consorcio: consorcio2._id
      });

      const activo1 = await Activo.create({
        nombre: 'Ascensor',
        marca: 'Otis',
        modelo: '3000',
        ubicacion: 'Hall principal',
        consorcio: consorcio1._id
      });
      const activo2 = await Activo.create({
        nombre: 'Extintor',
        marca: 'ABC',
        modelo: '10Kg',
        ubicacion: 'Piso 5',
        consorcio: consorcio2._id
      });

      // 3. (Paso Clave) Actualizar los Consorcios con los IDs de los Inquilinos y Activos
      await Consorcio.findByIdAndUpdate(consorcio1._id, {
        $push: { inquilinos: inquilino1._id, activos: activo1._id }
      });
      await Consorcio.findByIdAndUpdate(consorcio2._id, {
        $push: { inquilinos: inquilino2._id, activos: activo2._id }
      });

      console.log('Datos de prueba creados exitosamente.');
    }
  } catch (err) {
    console.error('Error al cargar los datos de prueba:', err);
  }
}

// Importar Rutas y Middleware
const consorciosRouter = require('./routes/consorcios');
const inquilinosRouter = require('./routes/inquilinos');
const activosRouter = require('./routes/activos');
const authRouter = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

// Usar Rutas sin el Middleware de Autenticación
app.use('/api/consorcios', consorciosRouter);
app.use('/api/inquilinos', inquilinosRouter);
app.use('/api/activos', activosRouter);
app.use('/api/auth', authRouter);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('API de Gestión de Consorcios en funcionamiento');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor de la API funcionando en el puerto ${PORT}`);
});