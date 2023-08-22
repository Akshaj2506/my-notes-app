const connectToMongo = require('./db');
const express = require("express");
const app = express();
const port = 3000;
connectToMongo();

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))
app.get('/', (req, res) => {
   res.send("Hello Akshaj");
})
app.listen(port, () => {
   console.log(`App listening at http://localhost:${port}`);
})