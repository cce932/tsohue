# pull official base image
FROM node:14.15

# Set the working directory to /app
WORKDIR /app 

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN yarn install --silent
RUN yarn global add react-scripts

# Copy the current directory . in the project to the workdir ./ in the image.
COPY . ./

# start app
CMD ["yarn", "start"]