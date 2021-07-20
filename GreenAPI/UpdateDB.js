const { getQldbDriver } = require("./helper/ConnectToLedger");
const { getAddress } = require("./helper/Emissions");

const qldbDriver = getQldbDriver();

const updateDoc = async (txn, o, docId) => {
  const statement = `UPDATE GreenTransaction AS p BY pid
  SET p = ?
  WHERE pid = ?`;
  let result = await txn.execute(statement, o, docId);
  return result;
}

const findAll = async (txn) => {
  const statement = `SELECT * FROM _ql_committed_GreenTransaction`;
  let result = await txn.execute(statement);
  return result;
};

// Run in nodejs, updates all transactions with address field if needed
const updateAll = async () => {
  let transactions;
  await qldbDriver.executeLambda(async (txn) => {
    const result = await findAll(txn);
    transactions = result.getResultList();
  });

  transactions = JSON.parse(JSON.stringify(transactions));

  for (let i in transactions) {
    const o = transactions[i].data;
    const description = o.description;
    const start = description?.start;
    const end = description?.end;
    const startLat = start?.lat;
    const startLng = start?.lng;
    const startAddr = start?.address;
    const endLat = end?.lat;
    const endLng = end?.lng;
    const endAddr = end?.address;

    if (startLat && startLng && endLat && endLng && !startAddr && !endAddr) {
      let startAddress;
      let endAddress;
      const startAddressPromise = getAddress(
        startLat,
        startLng
      ).then((x) => (startAddress = x));
      const endAddressPromise = getAddress(
        endLat,
        endLng
      ).then((x) => (endAddress = x));
      await Promise.all([startAddressPromise, endAddressPromise]);

      if (!startAddress || !endAddress) {
        continue;
      }

      start.address = startAddress;
      end.endAddress = endAddress;

      const docId = transactions[i].metadata.id;

      if (!docId) {
        continue;
      }

      qldbDriver.executeLambda(async (txn) => {
        await updateDoc(txn, o, docId);
        console.log(o);
      });
    }
  }
};

updateAll();
