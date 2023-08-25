const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/myNotesApp';

const connectToMongo = () => {
   mongoose.connect(mongoURI);
   console.log("Connected to database");
}

module.exports = connectToMongo;