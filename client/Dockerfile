# Build Environment
# I selected this as stable version and alpine lightweight so save 
# downloading more than needed. Probably best to stick to a version
# rather than latest to avoid breaking changes in node.
FROM node:14.8.0-alpine as build
# set the base working directory so ./ will all be relative to this
# directory
WORKDIR /app
# this will copy the package.json and package-lock.json files into 
# the app directory
COPY package*.json ./
# this will install the required npm packages from the 
# package-lock.json 
RUN npm ci --silent
# this copies all the project files from the local working directory
# into the containers working directory
# excluding node_modules as this is in .dockerignore
COPY . ./
# runs the npm script to compile and minify the react app which 
# will output a build folder
RUN npm run build

# Production Environment
# gets the latest stable version of nginx web server
# again alpine to reduce image size
FROM nginx:stable-alpine
# copies the build folder from our build container and copies
# to the default folder for nginx to serve html etc
COPY --from=build /app/build /usr/share/nginx/html
# set the default command and parameter to run nginx
CMD ["nginx", "-g", "daemon off;"]