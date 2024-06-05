require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const alumnoRoutes = require('./routes/alumnoRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/alumnos', alumnoRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
