<div align = "center">
  <img src="./brushWireLogo.png" width="300px"><h1 align="center"> 
    <h5 align="center"> <i style="color:grey;"> 
   A blog for inspired artists</i> </h5>
</div>

Made with [Node.js](https://nodejs.org/en) , [React](https://es.react.dev/) and [Docker](https://www.docker.com/)

🔴 **Live API:** [Right here ](http://18.116.43.163:81/)

![](./Demo.gif)

Made with 💚 by Daniel Rayo

---

## Running the Project

### Backend 🔌

1. **Create the DB and API:** The backend requires 2 functional Docker Container with postgres and node, for that, use docker compose as follow.</u>
   
   ```bash
   docker compose up // Creates containers and start it
   docker compose down // Stop containers
   docker compose down -v // Stop containers and delete DB data
   ```

2. **Install dependencies:** Now install the dependencies
   
   ```bash
   npm install    # if using npm
   yarn install   # if using yarn
   ```

3. **Set environment variables:** The API extract important configuration from environment variables declared in a `.env` file. Create one within `/backend` directory with this variables. You can change them to your like.
   
   ```bash
   PORT=3000
   LOG_LEVEL='info'
   JWT_SECRET='superSecretPassword'
   STORE_DIR='/path/to/folder/where/blog/files/are/stored'
   ```

4. **Start API:** Finally you can start the API for DEVELOPMENT by executing:
   
   ```bash
   npm start      # if using npm
   yarn start     # if using yarn
   npm dev        # For development
   yarn dev       # For develpment
   ```

### Frontend 💫

The frontend layer is requires less steps for getting started, and requires you to be on the `/frontend` directory.

- **For development** : Create a dev server with vite
  
  ```bash
  npm run dev
  ```

- **For production** : 
  
  ```bash
  npm run build
  npm run preview #(optional) 
  ```
