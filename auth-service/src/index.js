const express = require('express');  // Importa el framework Express para crear el servidor web
const jwt = require('jsonwebtoken');  // Librería para generar y verificar tokens JWT (autenticación)
const mongoose = require('mongoose'); // Librería para interactuar con MongoDB
const bcrypt = require('bcryptjs');  // Librería para el cifrado de contraseñas
const cors = require('cors');

const app = express();
app.use(express.json());  // Middleware para parsear cuerpos de solicitudes en formato JSON
app.use(cors()); // Habilita CORS

// Define el esquema de usuario en MongoDB
const userSchema = new mongoose.Schema({
  username: String,  // Nombre de usuario
  password: String   // Contraseña cifrada
});

// Crea el modelo de Usuario basado en el esquema definido
const User = mongoose.model('User', userSchema);

// Ruta para el registro de nuevos usuarios
app.post('/register', async (req, res) => {
  // Cifra la contraseña del usuario antes de guardarla en la base de datos
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({ username: req.body.username, password: hashedPassword });
  await user.save();  // Guarda el nuevo usuario en la base de datos
  res.send('User registered successfully!');  // Respuesta al cliente
});

// Ruta para autenticación de usuarios (login)
app.post('/login', async (req, res) => {
  // Busca al usuario por su nombre en la base de datos
  const user = await User.findOne({ username: req.body.username });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    // Verifica si el usuario existe y si la contraseña es correcta
    return res.status(403).send('Invalid credentials');
  }
  // Genera un token JWT para el usuario autenticado
  const token = jwt.sign({ userId: user._id }, 'secret-key');
  res.json({ token });  // Envía el token al cliente
});

// Conecta con la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));


// Inicia el servidor de autenticación en el puerto 4000
app.listen(4000, () => console.log('Auth service running on port 4000'));
