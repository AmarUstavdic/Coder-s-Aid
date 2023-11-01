const express = require('express');
const axios = require('axios');
const secret = require('../../secret')
const Client = require('./middleware/Client')


const c = new Client(
    secret.handle,
    secret.handleOrEmail,
    secret.password
);

/*
async function main() {
    await c.login();
    c.isLoggedIn();
}

main();
*/





const app = express();
const PORT = 3000;

app.get('/make-request', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





