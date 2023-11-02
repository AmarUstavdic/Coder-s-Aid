const express = require('express');
const axios = require('axios');
const secret = require('../../secret')


const CodeforcesAPI = require('./middleware/CodeforcesAPI')

const cfapi = new CodeforcesAPI(
    secret.handle, 
    secret.handleOrEmail,
    secret.password
)

async function main() {
    await cfapi.login()

    cfapi.submit('./middleware/main.cpp')
}

main()



/*

const server = express();
const PORT = 3000;

server.get('/money', async (req, res) => {
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


server.get('*', (req, res) => {
  res.status(404).send('Pusi kurac');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

*/





