# The FROM instruction defines a base image and version to create this new image from
FROM node:16

# Make directory
RUN mkdir -p /app

# The RUN command perform a task run by the container shell in the background
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install packeges using NPM or "ci" it install exact same dependency
RUN npm i

# If you are building your code for production
# RUN npm ci --only=production

#Copy entire app from source to destination
# Bundle app source
COPY . .

ENV MONGO_URI=mongodb://172.17.0.1:27017/e-com-db 

# The EXPOSE instruction defines a network port that the docker container should listen on when run
EXPOSE 3000

# Run the "npm start" command to see the app on browser
CMD ["npm", "start"] 