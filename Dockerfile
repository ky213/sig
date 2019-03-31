FROM node
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./
COPY . .
RUN yarn install
# If you are building your code for production
# RUN npm install --only=production
# Bundle app source
EXPOSE 80
RUN yarn build
CMD [ "yarn", "start" ]
