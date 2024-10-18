# “Time Tracker” Developer Exercise
   
## Usage

1. Create the .env file whit yours environment parameters

2. Build images `docker compose build --no-cache`

3. Run container `docker compose up -d`

4. Install modules `npm install` or in the host `docker exec -it time-tracker-frontend-node-1 sh -c "npm install"`

5. Start dev server `npm run dev` or in the host `docker exec -it time-tracker-frontend-node-1 sh -c "npm run dev"`

6. Default Url to access is `http://localhost:3000` 



## ENV example

SERVER_PORT=3000

API=http://localhost/api
