const express = require('express');
const session = require('express-session');
const axios = require('axios');
const Database = require('./database/Database')


const db = new Database()
db.connect()
db.query('SHOW TABLES;')


const server = express();
const PORT = 3232;

server.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    res.json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

server.get('/register', (req, res) => {
    res.json('Hajmo na cik')
})

server.get('/tables', (req, res) => {

})


server.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});







