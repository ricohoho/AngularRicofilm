# Dockerfile pour le frontend Angular
FROM node:22 AS build

WORKDIR /usr/src/app

#ENV API_URL=http://ricohoho.fr:3000
#ENV API_URL=http://ricofilm-backc:3000

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Étape 2 : Utiliser un serveur léger pour héberger Angular
FROM nginx:alpine
# Copie du template Nginx (avec variables ${API_URL})
#COPY default.conf.template /etc/nginx/templates/default.conf.template

# Copie du build Angular
COPY nginx.conf.davic /etc/nginx/conf.d/default.conf
COPY from=build /usr/src/app/dist/angular-rico-film /usr/share/nginx/html

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
