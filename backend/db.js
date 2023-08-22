const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/';
const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
   res.send("Hello Akshaj");
})
app.listen(port, () => {
   console.log(`App listening at http://localhost:${port}`);
})
const connectToMongo = () => {
   mongoose.connect(mongoURI);
   console.log("Connected to database");
}

module.exports = connectToMongo;