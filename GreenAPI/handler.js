/* eslint-disable no-unused-vars */
const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const {
  createTransaction,
  getTransactionFrom,
  getTransactionTo,
  getAllTransactions,
} = require("./helper/Rewards");
const {
  createUser,
  getUserByID,
  getAllUsers,
  updateUserCredit,
} = require("./helper/Users");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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
  const { fromID, toID, amount, description } = req.body;

  try {
    const response = await createTransaction(fromID, toID, amount, description);

    return res.status(201).json(response);
  } catch (error) {
    const errorBody = {
      status: 500,
      title: error.name,
      detail: error.message,
    };
    return res.status(500).json(errorBody);
  }
});

app.get("/transaction/from/:fromID", async (req, res, next) => {
  try {
    const response = await getTransactionFrom(req.params.fromID);

    return res.status(200).json(response);
  } catch (error) {
    const errorBody = {
      status: 500,
      title: error.name,
      detail: error.message,
    };
    return res.status(500).json(errorBody);
  }
});

app.get("/transaction/to/:toID", async (req, res, next) => {
  try {
    const response = await getTransactionTo(req.params.toID);

    return res.status(200).json(response);
  } catch (error) {
    const errorBody = {
      status: 500,
      title: error.name,
      detail: error.message,
    };
    return res.status(500).json(errorBody);
  }
});

app.get("/transaction", async (req, res, next) => {
  try {
    const response = await getAllTransactions();

    return res.status(200).json(response);
  } catch (error) {
    const errorBody = {
      status: 500,
      title: error.name,
      detail: error.message,
    };
    return res.status(500).json(errorBody);
  }
});

app.post("/user", async (req, res, next) => {
  const { name } = req.body;

  try {
    const response = await createUser(name);

    return res.status(201).json(response);
  } catch (error) {
    const errorBody = {
      status: 500,
      title: error.name,
      detail: error.message,
    };
    return res.status(500).json(errorBody);
  }
});

app.patch(
  "/user/:userID/update/credit/:creditToAdd",
  async (req, res, next) => {
    try {
      const response = await updateUserCredit(
        req.params.userID,
        req.params.creditToAdd
      );

      return res.status(201).json(response);
    } catch (error) {
      const errorBody = {
        status: 500,
        title: error.name,
        detail: error.message,
      };
      return res.status(500).json(errorBody);
    }
  }
);

app.get("/user/:userID", async (req, res, next) => {
  try {
    const response = await getUserByID(req.params.userID);

    return res.status(200).json(response);
  } catch (error) {
    const errorBody = {
      status: 500,
      title: error.name,
      detail: error.message,
    };
    return res.status(500).json(errorBody);
  }
});

app.get("/user", async (req, res, next) => {
  try {
    const response = await getAllUsers();

    return res.status(200).json(response);
  } catch (error) {
    const errorBody = {
      status: 500,
      title: error.name,
      detail: error.message,
    };
    return res.status(500).json(errorBody);
  }
});

app.post("/emissions", async (req, res, next) => {
  try {
    const response = await getAllUsers();
    return res.status(200).json(response);
  } catch (error) {
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
