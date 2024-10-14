const express = require('express');  // Importa Express
const { createProxyMiddleware } = require('http-proxy-middleware');  // Middleware para crear proxies

const app = express();

// Proxy para redirigir las solicitudes de autenticación al microservicio de autenticación
app.use('/auth', createProxyMiddleware({ target: 'http://auth-service:4000', changeOrigin: true }));

// Proxy para redirigir las solicitudes de tareas al microservicio de gestión de tareas
app.use('/tasks', createProxyMiddleware({ target: 'http://task-service:4001', changeOrigin: true }));

// Inicia el servidor API Gateway en el puerto 3000
app.listen(3000, () => console.log('API Gateway running on port 3000'));
