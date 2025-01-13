const pg = require('pg');
const fs = require('./../ca');
require('dotenv').config();
const db = new pg.Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl:{
            require:true,
            rejectUnauthorized:false,
            ca:fs
      }
})
module.exports = db;