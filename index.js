const express = require('express');
const app = express();
const axios = require('axios');

const os = require('os');
const host = os.hostname();

const port = process.env.PORT || '3000';
const serverAddress = process.env.SRVADDR || 'localhost';
const serverPort = process.env.SRVPORT || '3000';
const apiTimer = process.env.APITIME || '5000';

app.get('/', (req, res) => res.send(`${host}`))
app.get('/api', (req, res) => {
    const time = Date.now();
    res.json({host, time});
});

setInterval(()=> {
    axios.get(`http://${serverAddress}:${serverPort}/api`)
    .then(function(response) {
    // console.log(response.headers);
    console.log(response.data);
  });
},apiTimer)

app.listen(port, () => console.log(`${host} Listening on port ${port}`))