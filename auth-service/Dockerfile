# Dockerfile for auth-service and gateway
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Reconstruye bcrypt para asegurarse de que es compatible con la plataforma
RUN npm rebuild bcrypt --build-from-source

# Copia el resto de la aplicación
COPY . .

# Expone el puerto del servicio
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["node", "src/index.js"]