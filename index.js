const express = require('express');
require('dotenv').config();
const runDBMigrations = require('./Middleware/runDBMigration')
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

//db
(async () => {
      try {
        await runDBMigrations();
        console.log('Migration completed successfully');
      } catch (error) {
        console.error('Migration failed', error);
      }
    })(); 

app.get('/',(req,res)=>{
      res.send("Welcome to Book Collection API")
})

// Custom 404 Error Handler for invalid routes
app.use((req, res) => {
      res.status(404).json({
        error: "Sorry Route not found!",
        message: `The route '${req.originalUrl}' does not exist on this server. Please check your request and try again.`
      });
    });
app.listen(PORT,()=>console.log(`Server is running on Port number ${PORT}...`))