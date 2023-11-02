const express = require('express');
const session = require('express-session');
const axios = require('axios');
const Database = require('./database/Database')
const cors = require('cors');


const db = new Database()
db.connect()
db.query('SHOW TABLES;')


const server = express();
server.use(cors());
server.use(express.json());


server.get('/', (req, res) => {
  res.send('<h1>Hello World<h1/>')
})


server.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log(req.body)


  if (username == 'hello' && password == 'hello') {
    res.status(200)
    res.send('Login successful')
  } else {
    res.status(401).send('Authentication failed');
  }
});


const port = 5000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});







