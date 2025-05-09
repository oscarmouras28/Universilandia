# Etapa 1: build
FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa 2: nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Configurar nginx para escuchar en el puerto correcto de Cloud Run
RUN echo 'server { listen 8080; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' \
  > /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
