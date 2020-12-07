module.exports = {
  "type": "sqlite",
  "database": "./src/database/database.sqlite",
  "host": process.env.HOST,
  "port": process.env.PORT,
  "migrations": [
    "./dist/database/migrations/*.hs"
  ],
  "entities": [
    "./dist/models/*.js"
  ],
  "cli": {
    "migrationsDir": "./dist/database/migrations"
  },
  "username": process.env.ORM_USERNAME,
  "password": process.env.ORM_PASSWORD
}