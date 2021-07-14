const serverless = require("serverless-http");
const express = require("express");
const app = express();
const rewards = require('./routes/rewards.routes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use('/', rewards)
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
