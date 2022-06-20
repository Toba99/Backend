import express, { Express, Router } from 'express';
import routes from './routes'
import Knex from 'knex'
import { Model } from 'objection'
import bodyParser from 'body-parser'
const environments = require('./knexfile') 
require('dotenv').config();
express.json({limit:2000, type: 'application/json'})
const app: Express = express();
const port = process.env.PORT|| 1337;
// parse application/json
app.use(bodyParser.json())
const NODE_ENV = process.env.NODE_ENV || "development";
// Initialize knex.
const knex = Knex(environments[NODE_ENV]); // added prodcution incase of mispelling, wont mess up production DB

// Bind all Models to the knex instance. You only
// need to do this once before you use any of
// your model classes.
Model.knex(knex);

// "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
app.use(routes)
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));