# Dockerfile para el Frontend
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json ./
COPY package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto de la aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]