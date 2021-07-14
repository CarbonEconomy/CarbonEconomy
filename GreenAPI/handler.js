const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { createTransaction } = require('./helper/Rewards');

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

app.post("/transaction", async (req, res, next) => {
  const {
    to, from, amount,
  } = JSON.parse(req.body);

  try {
    const response = await createTransaction(to, from, amount);

    return res.status(201).json(response);
  } catch (error) {
    // Log.error(`Error returned: ${error}`);
    const errorBody = {
      status: 500,
      title: error.name,
      detail: error.message,
    };
    return res.status(500).json(errorBody);
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
