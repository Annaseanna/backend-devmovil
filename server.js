const express = require('express');
require('dotenv').config();
const dbConnection = require('./config/db'); // Importa la función de conexión
const personaRoutes = require("./routes/personaRoutes")
const app = express();

// Conexión a MongoDB
dbConnection(); // Llamamos a la función para establecer la conexión a la base de datos

app.use(express.json()); // Middleware para procesar JSON
app.use('/personas', personaRoutes); // Definir prefijo para las rutas

// Aquí puedes configurar tus rutas y lógica adicional
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
