const express = require('express');  // Importa el framework Express
const mongoose = require('mongoose'); // Importa la librería para interactuar con MongoDB
const cors = require('cors');

const app = express();
app.use(express.json());  // Middleware para parsear cuerpos de solicitudes JSON
app.use(cors()); // Habilita CORS

// Define el esquema de una tarea
const taskSchema = new mongoose.Schema({
  title: String,        // Título de la tarea
  description: String,  // Descripción de la tarea
  completed: Boolean,   // Estado de la tarea (completada o no)
  userId: String        // ID del usuario que creó la tarea
});

// Crea el modelo de Tarea basado en el esquema definido
const Task = mongoose.model('Task', taskSchema);

// Middleware para verificar el token
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
      return res.status(403).send('Token missing');
  }
  // Lógica para validar el token (JWT u otro tipo de token)
  next();
};

// Ruta para la creación de tareas
app.post('/tasks', authMiddleware, async (req, res) => {
  // Crea una nueva tarea usando los datos enviados en la solicitud
  const task = new Task(req.body);
  await task.save();  // Guarda la nueva tarea en la base de datos
  res.send('Task created successfully!');  // Responde al cliente
});

// Ruta para obtener todas las tareas
app.get('/tasksfind', authMiddleware, async (req, res) => {
  const tasks = await Task.find();  // Recupera todas las tareas de la base de datos
  res.json(tasks);  // Envía las tareas como respuesta en formato JSON
});

// Conecta con la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Inicia el servidor de gestión de tareas en el puerto 4001
app.listen(4001, () => console.log('Task service running on port 4001'));
