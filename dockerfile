FROM node:18.16
WORKDIR /grid-app
ARG PORT_BUILD=3000
ENV PORT=$PORT_BUILD
EXPOSE $PORT_BUILD
COPY . .
RUN npm install 
ENTRYPOINT npm start