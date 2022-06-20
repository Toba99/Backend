// Update with your config settings.
require("dotenv").config();
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_HOST = process.env.DB_HOST;

module.exports =  {
		 'development':{
				client: "mysql",
				connection: {
					host: DB_HOST,
					port: 3306,
					database: DB_DATABASE,
					user: DB_USERNAME,
					password: DB_PASSWORD,
					// charset: "utf8mb4_bin",
				},
				pool: {
					min: 2,
					max: 10,
				},
				migrations: {
					tableName: "knex_migrations",
				},
			},
		 'staging': {
				client: "mysql",
				connection: {
					host: DB_HOST,
					port: 3306,
					database: DB_DATABASE,
					user: DB_USERNAME,
					password: DB_PASSWORD,
					// charset: "utf8mb4_bin",
				},
				pool: {
					min: 2,
					max: 10,
				},
				migrations: {
					tableName: "knex_migrations",
				},
			},
			'production':{
				client: "mysql",
				connection: {
					host: DB_HOST,
					port: 3306,
					database: DB_DATABASE,
					user: DB_USERNAME,
					password: DB_PASSWORD,
					// charset: "utf8mb4_bin",
				},
				pool: {
					min: 2,
					max: 10,
				},
				migrations: {
					tableName: "knex_migrations",
				},
			}
	}

	

