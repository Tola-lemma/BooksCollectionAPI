const express = require('express');
const PORT = 3000;
const app = express();
app.use(express.json());


app.get('/',(req,res)=>{
      res.send("Welcome to Book Collection API")
})

app.listen(PORT,()=>console.log(`Server is running on Port number ${PORT}...`))