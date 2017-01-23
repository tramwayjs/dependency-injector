[![build status](https://gitlab.com/tramwayjs/tramway-connection-example/badges/master/build.svg)](https://gitlab.com/tramwayjs/tramway-connection-example/commits/master)

[![coverage report](https://gitlab.com/tramwayjs/tramway-connection-example/badges/master/coverage.svg)](https://gitlab.com/tramwayjs/tramway-connection-example/commits/master)

# Set up instructions
1. Ensure you have `Node` and `Docker` installed
2. If you plan to test `Docker` with Kitematic on Windows, clone the repository to `\Documents\Kitematic\tramway-example\usr\src\app` and move the contents from the Client folder to app including the .git folder.
3. Install gulp globally `npm install --global gulp-cli`
4. Run `npm install`
5. Update docker and gitlab ci files with the appropriate repository information.
6. If not using Docker: clone and install https://gitlab.com/tramwayjs/tramway-example

# To use

## Using Docker

**Important:** Ensure the `host` in your configuration (config/exampleAPI.js) is set to the name of the service in the docker-compose file. In this example, it is set to 'api'. This project configuration favors Docker since using it without Docker is less work apart from setting up another project.

### With Kitematic
1. In `Kitematic`, point the directory to the one we set up earlier
2. Run the container

### Without Kitematic
1. Run the docker compose on each change: `docker-compose up`
2. Run the built container

## Without Docker

**Important:** Start the API you cloned from https://gitlab.com/tramwayjs/tramway-example and remove the `host` entry in dev/config/exampleAPI.js

### With Visual Studio Code
1. Make sure you have Visual Studio Code installed
2. Open the directory in Visual Studio Code
3. Use `Ctrl` + `Shift` + `B` to build the dist folder. It will watch and save the changes
4. Go to the built-in debugger and debug.
5. Change the port if it conflicts with a running client.

### Without Visual Studio Code
1. Run `npm start` for a vanilla build and run.
2. Run `gulp` whenever you want to watch changes and use `npm start` in another terminal to see changes. Be sure to restart after significant changes.

The page that will run will be accessible via http://localhost:8081 by default and the API will be served from http://localhost:8080