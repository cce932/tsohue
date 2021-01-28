# pull official base image 13.12.0-alpine
FROM node:13.12.0-alpine

# set working directory container 裡面的工作目錄
WORKDIR /app 

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN yarn install --silent

# add app
COPY . ./

# start app
CMD ["yarn", "start"]