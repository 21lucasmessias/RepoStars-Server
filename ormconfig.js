module.exports = {
  "type": "sqlite",
  "database": "./src/database/database.sqlite",
  "host": process.env.HOST,
  "port": process.env.PORT,
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "entities": [
    "./src/models/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  },
  "username": process.env.ORM_USERNAME,
  "password": process.env.ORM_PASSWORD
}