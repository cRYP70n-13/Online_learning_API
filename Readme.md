
# Online Learning API 🎉🏗

> Backend API for Online Learning application, which is a bootcamp directory website

## Usage

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own

## Install Dependencies

```bash
npm install
```

## Run App

``` bash
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

``` node
# Destroy all data
node seeder -d

# Import all data
node seeder -i

# Show all data
node seeder -s
```

## Docker-compose

If you want to use it with docker compose you can just run:

```docker
  docker-compose --env-file PAHT/TO/CONFIG/FILE.env up -d
```

## Demo

Extensive documentation with examples [here](https://documenter.getpostman.com/view/10545349/TVev6RWA)

- Version: 1.0.0
- License: MIT
- Author: cRYP70n-13
