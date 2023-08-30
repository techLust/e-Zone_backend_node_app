FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV MONGO_URI=mongodb://172.17.0.1:27017/e-ZoneDB
ENV MONGO_USERNAME='Mahatab'
ENV MONGO_PASSWORD='123'
ENV PORT=4000
EXPOSE 4000
CMD [ "npm" , "start" ]