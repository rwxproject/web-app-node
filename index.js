const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

const os = require("os");
const host = os.hostname();

const port = process.env.PORT || "3000";
const serverAddress = process.env.SRVADDR || "localhost";
const serverPort = process.env.SRVPORT || "3000";
const apiTimer = process.env.APITIME || "5000";

// const corsOptions = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: true,
//   optionsSuccessStatus: 204,
// };

var corsOptions = {
  origin: ["https://rwx.auth0.com", "http://system1.app.rwx.systems"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization,x-user-id",
  exposedHeaders: "Content-Range,X-Content-Range,x-user-id",
  preflightContinue: true,
  optionsSuccessStatus: 204,
  credentials: true,
};

app.options("*", cors()); // include before other routes
app.use(cors(corsOptions));

app.get("/", (req, res) => res.send(`${host}`));
app.get("/api", (req, res) => {
  const userId = req.header("x-user-id") || "user";
  const time = Date.now();
  console.log(req.headers);
  console.log({ host, time, userId });
  res.json({ host, time, userId });
});

setInterval(() => {
  axios
    .get(`http://${serverAddress}:${serverPort}/api`, {
      headers: { "x-user-id": host },
    })
    .then(function (response) {
      console.log(response.headers);
      console.log(response.data);
    });
}, apiTimer);

app.listen(port, () => console.log(`${host} Listening on port ${port}`));
