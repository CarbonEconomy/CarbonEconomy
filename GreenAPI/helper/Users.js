const { getQldbDriver } = require("./ConnectToLedger");
const tableName = "GreenUser";

const getMaxUserID = async (txn) => {
  const statement = `SELECT MAX(id) AS maxID FROM ${tableName}`;
  let result = await txn.execute(statement);
  return result;
};

const findByID = async (txn, userID) => {
  const statement = `SELECT * FROM ${tableName} WHERe id = ${parseInt(userID)}`;
  let result = await txn.execute(statement);
  return result;
};

const findAll = async (txn) => {
  const statement = `SELECT * FROM ${tableName}`;
  let result = await txn.execute(statement);
  return result;
};

const insertUser = async (txn, document) => {
  const statement = `INSERT INTO ${tableName} ?`;
  let result = await txn.execute(statement, document);
  return result;
};

const updateUser = async (txn, userID, newCredit) => {
  const statement = `UPDATE ${tableName} AS gu SET gu.totalCredit = ${newCredit} WHERE gu.id = ${parseInt(
    userID
  )}`;
  let result = await txn.execute(statement);
  return result;
};

const createUser = async (name) => {
  let newUser;
  const qldbDriver = getQldbDriver();
  await qldbDriver.executeLambda(async (txn) => {
    const maxID = await getMaxUserID(txn);
    const resultList = maxID.getResultList();
    const newID = parseInt(resultList[0].get("maxID")) + 1;

    const userDoc = [
      {
        id: newID,
        name,
      },
    ];

    await insertUser(txn, userDoc);
    newUser = {
      id: newID,
      name,
      totalCredit: 0,
    };
  });
  return newUser;
};

const getUserByID = async (userID) => {
  let user;

  const qldbDriver = getQldbDriver();
  await qldbDriver.executeLambda(async (txn) => {
    const result = await findByID(txn, userID);
    user = result.getResultList();
  });
  return user;
};

const getAllUsers = async () => {
  let user;

  const qldbDriver = getQldbDriver();
  await qldbDriver.executeLambda(async (txn) => {
    const result = await findAll(txn);
    user = result.getResultList();
  });
  return user;
};

const updateUserCredit = async (userID, creditToAdd) => {
  let user;
  const qldbDriver = getQldbDriver();
  await qldbDriver.executeLambda(async (txn) => {
    const currUser = await findByID(txn, userID);
    const resultList = currUser.getResultList();
    const newCredit =
      parseInt(resultList[0].get("totalCredit")) + parseInt(creditToAdd);

    await updateUser(txn, userID, newCredit);

    user = [
      {
        id: userID,
        name: resultList[0].get("name"),
        totalCredit: newCredit,
      },
    ];
  });

  return user;
};

module.exports = {
  createUser,
  getUserByID,
  getAllUsers,
  updateUserCredit,
};
