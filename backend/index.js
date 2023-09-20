const connectToMongo = require('./db');
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 5000;
dotenv.config();
connectToMongo();
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
   res.send("Hello Akshaj");
})
app.listen(port, () => {
   console.log(`App listening at http://localhost:${port}`);
})