const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importar modelos
const Persona = require('./models/Persona');
const Convocatoria = require('./models/Convocatoria');
const Postulacion = require('./models/Postulacion');
const ReviewConvocatoria = require('./models/ReviewConvocatoria');
const Conversacion = require('./models/Conversacion');
const Mensaje = require('./models/Mensaje');

// Inicializar Express
const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('📡 Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Rutas de prueba
app.get('/', (req, res) => {
  res.send('🚀 API funcionando correctamente');
});

// Importar rutas (debes crearlas)
const personaRoutes = require('./routes/personaRoutes');
const convocatoriaRoutes = require('./routes/convocatoriaRoutes');

app.use('/api/personas', personaRoutes);
app.use('/api/convocatorias', convocatoriaRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
