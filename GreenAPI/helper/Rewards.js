/*
 * Helper utility that provides the implementation for interacting with QLDB
 * Adapted from https://github.com/AWS-South-Wales-User-Group/qldb-simple-demo/blob/master/backend/functions/helper/licence.js
 */

const { getQldbDriver } = require("./ConnectToLedger");
const { getAddress } = require("./Emissions");
const tableName = "GreenTransaction";

const insertDocument = async (txn, document) => {
  const statement = `INSERT INTO ${tableName} ?`;
  let result = await txn.execute(statement, document);
  return result;
};

const findAllFrom = async (txn, fromID) => {
  const statement = `SELECT * FROM ${tableName} AS gt WHERE gt.fromID = ?`;
  let result = await txn.execute(statement, parseInt(fromID));
  return result;
};

const findAllTo = async (txn, toID) => {
  const statement = `SELECT * FROM ${tableName} AS gt WHERE gt.toID = ?`;
  let result = await txn.execute(statement, parseInt(toID));
  return result;
};

const findAll = async (txn) => {
  const statement = `SELECT * FROM ${tableName}`;
  let result = await txn.execute(statement);
  return result;
};

/**
 * Creates a new Transaction record in the QLDB ledger.
 * @param from The name of the licence holder.
 * @param to The email address of the licence holder.
 * @param amount The telephone number of the licence holder.
 * @returns The JSON record of the new licence reecord.
 */
const createTransaction = async (fromID, toID, amount, description) => {
  let transaction;

  let startAddress;
  let endAddress;
  const startAddressPromise = getAddress(
    description?.start?.lat,
    description?.start?.lng
  ).then((x) => (startAddress = x));
  const endAddressPromise = getAddress(
    description?.end?.lat,
    description?.end?.lng
  ).then((x) => (endAddress = x));
  await Promise.all([startAddressPromise, endAddressPromise]);

  if (startAddress) {
    description.start.address = startAddress;
  }

  if (endAddress) {
    description.end.address = endAddress;
  }

  // Get a QLDB Driver instance
  const qldbDriver = getQldbDriver();
  await qldbDriver.executeLambda(async (txn) => {
    const transactionDoc = [
      {
        fromID,
        toID,
        amount,
        description,
      },
    ];

    // Create the record. This returns the unique document ID in an array as the result set
    const result = await insertDocument(txn, transactionDoc);
    const docIdArray = result.getResultList();
    const docId = docIdArray[0].get("documentId").stringValue();
    transaction = {
      transactionId: docId.toUpperCase(),
      fromID,
      toID,
      amount,
      description
    };
  });
  return transaction;
};

const getTransactionFrom = async (fromID) => {
  let transaction;

  const qldbDriver = getQldbDriver();
  await qldbDriver.executeLambda(async (txn) => {
    const result = await findAllFrom(txn, fromID);
    transaction = result.getResultList();
  });
  return transaction;
};

const getTransactionTo = async (toID) => {
  let transaction;

  const qldbDriver = getQldbDriver();
  await qldbDriver.executeLambda(async (txn) => {
    const result = await findAllTo(txn, toID);
    transaction = result.getResultList();
  });
  return transaction;
};

const getAllTransactions = async () => {
  let transaction;

  const qldbDriver = getQldbDriver();
  await qldbDriver.executeLambda(async (txn) => {
    const result = await findAll(txn);
    transaction = result.getResultList();
  });
  return transaction;
};

module.exports = {
  createTransaction,
  getTransactionFrom,
  getTransactionTo,
  getAllTransactions,
};
