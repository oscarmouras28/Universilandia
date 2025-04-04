# 1️⃣ Usar una imagen oficial de Node.js
FROM node:18-alpine 

# 2️⃣ Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3️⃣ Copiar los archivos del backend al contenedor
COPY package.json package-lock.json ./
COPY . .

# 4️⃣ Instalar las dependencias
RUN npm install --omit=dev

# 5️⃣ Exponer el puerto en el que corre el backend
EXPOSE 5000

# 6️⃣ Definir el comando de inicio del backend
CMD ["node", "dist/server.js"]