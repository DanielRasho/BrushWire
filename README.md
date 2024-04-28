<div align = "center">
  <img src="./brushWireLogo.png" width="300px"><h1 align="center"> 
    <h5 align="center"> <i style="color:grey;"> 
   A blog for inspired artists</i> </h5>
</div>

Made with [Node.js](https://nodejs.org/en) , [React](https://es.react.dev/) and [Docker](https://www.docker.com/)

🔴 **Live API:** Doing..

Made with 💚 by Daniel Rayo

---

## Running the Project

### Backend 🔌

1. **Create the DB:** The backend requires a functional Docker Container with postgres, for that, you must create it from the dockerfile in the repo.<u> Important: This will need to be done only once.</u>
   
   ```bash
   cd ./backend
   docker build -t brushwire-blog -f ./Dockerfile .
   docker run --name brushwire -p 5433:5432 -d brushwire-blog:latest
   ```

2. **Run the container**: In order or the API to communicate with the DB, the container must be running, for that execute:
   
   ```bash
   docker start brushwire
   ```

3. **Install dependencies:** Now install the dependencies
   
   ```bash
   npm install    # if using npm
   yarn install   # if using yarn
   ```

4. **Set environment variables:** The API extract important configuration from environment variables declared in a `.env` file. Create one within /backend directory with this variables. You can change them to your like.
   
   ```bash
   PORT=3000
   LOG_LEVEL='info'
   JWT_SECRET='superSecretPassword'
   STORE_DIR='/path/to/folder/where/blog/files/are/stored'
   ```

5. **Start API:** Finally you can start the API service by executing:
   
   ```bash
   npm start      # if using npm
   yarn start     # if using yarn
   npm dev        # For development
   yarn dev       # For develpment
   ```

### Frontend 💫

For now the only way to preview the frontend. Is by running liveServer extension within `./frontend/index.html` 



> Its a work in progress...
