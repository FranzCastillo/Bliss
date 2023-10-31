#Utiliza una imagen base con Node.js
FROM node:20.9.0

#Establece el directorio de trabajo en /app
WORKDIR /app

#Copia package.json and package-lock.json al contenedor
COPY package*.json ./

#Instalar dependecias del proyecto
RUN npm install

#Copia el resto de los archivos de tu proyecto al contenedor
COPY . .

#Construye la app en React
RUN npm run build

#Expón el puerto en el que se ejecuta la aplicación
EXPOSE 5173

#Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
