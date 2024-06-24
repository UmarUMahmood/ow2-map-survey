# Overwatch 2 Map Survey

This project is a web application to collect some data on what maps in Overwatch 2 are the most popular to play.
The frontend is built with Vuejs and served by Caddy, while the backend is built with Node.js, Express and MongoDB.

## Prerequisites

* Docker Desktop

## Installation

1. **Clone the repository:**

    ```sh
    git clone git@github.com:UmarUMahmood/ow2-map-survey.git
    cd ow2-map-survey
    ```

2. **Environment Variables:**

    Create `.env` in the root directory:

    ```sh
    echo "MONGO_INITDB_ROOT_USERNAME=yourmongodbusername" > .env
    echo "MONGO_INITDB_ROOT_PASSWORD=yourmongodbpassword" >> .env
    ```

    Create `.env` in `./backend` directory:

    ```sh
    echo "MONGO_URI=mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/" > ./backend/.env
    echo "ORIGIN_URL=http://localhost.com" >> ./backend/.env
    echo "PORT=3000" >> ./backend/.env
    ```

    Create `.env` in `./frontend` directory:

    ```sh
    echo "VITE_API_ENDPOINT_URL=http://localhost.com/api" > ./frontend/.env
    ```

    Replace the domain in `./frontend/Caddyfile` to be `:80`.

    If you use your own domain, then you can use that and replace `localhost` with your domain name in the `.env` files. Make sure to use the staging environment for TLS while testing.

3. **Build and Run Containers:**

    ```sh
    docker compose up --build
    ```
