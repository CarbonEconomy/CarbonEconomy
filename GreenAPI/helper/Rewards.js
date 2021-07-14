/*
 * Helper utility that provides the implementation for interacting with QLDB
 * Adapted from https://github.com/AWS-South-Wales-User-Group/qldb-simple-demo/blob/master/backend/functions/helper/licence.js
 */

// const AWSXRay = require("aws-xray-sdk-core");
// AWSXRay.captureAWS(require("aws-sdk"));
const { getQldbDriver } = require("./ConnectToLedger");

// Transactions for testing, probably not gonna use this

const insertDocument = async (txn, tableName, document) => {
  const statement = `INSERT INTO ${tableName} ?`;
  let result = await txn.execute(statement, document);
  return result;
};

/**
 * Creates a new Transaction record in the QLDB ledger.
 * @param from The name of the licence holder.
 * @param to The email address of the licence holder.
 * @param amount The telephone number of the licence holder.
 * @returns The JSON record of the new licence reecord.
 */
const createTransaction = async (from, to, amount) => {
  let transaction;
  // Get a QLDB Driver instance
  const qldbDriver = getQldbDriver();
  await qldbDriver.executeLambda(
    async (txn) => {
      const transactionDoc = [
        {
          to,
          from,
          amount,
        },
      ];

      // Create the record. This returns the unique document ID in an array as the result set
      const result = await insertDocument(txn, "test", transactionDoc);
      const docIdArray = result.getResultList();
      const docId = docIdArray[0].get("documentId").stringValue();
      transaction = {
        transactionId: docId.toUpperCase(),
        to,
        from,
      };
    }
  );
  return transaction;
};

// /**
//  * Helper function to get the latest revision of document by email address
//  * @param txn The {@linkcode TransactionExecutor} for lambda execute.
//  * @param email The email address of the document to retrieve
//  * @returns The Result from executing the statement
//  */
// async function getLicenceRecordByEmail(txn, email) {
//   Log.debug("In getLicenceRecordByEmail function");
//   const query = "SELECT * FROM BicycleLicence AS b WHERE b.email = ?";
//   return txn.execute(query, email);
// }

// /**
//  * Helper function to get the latest revision of document by document Id
//  * @param txn The {@linkcode TransactionExecutor} for lambda execute.
//  * @param id The document id of the document to retrieve
//  * @returns The Result from executing the statement
//  */
// async function getLicenceRecordById(txn, id) {
//   Log.debug("In getLicenceRecordById function");
//   const query = "SELECT * FROM BicycleLicence AS b WHERE b.licenceId = ?";
//   return txn.execute(query, id);
// }

// /**
//  * Helper function to update the document with penalty points and event details
//  * @param txn The {@linkcode TransactionExecutor} for lambda execute.
//  * @param points The latest points total to update
//  * @param event The event to add to the document
//  * @param email The email address of the document to update
//  * @returns The Result from executing the statement
//  */
// async function addEvent(txn, points, event, email) {
//   Log.debug("In the addEvent function");
//   const statement =
//     "UPDATE BicycleLicence as b SET b.penaltyPoints = ?, b.events = ? WHERE b.email = ?";
//   return txn.execute(statement, points, event, email);
// }

// /**
//  * Helper function to update the document with new contact details
//  * @param txn The {@linkcode TransactionExecutor} for lambda execute.
//  * @param telephone The latest telephone number to update
//  * @param postcode The latest postcode to update
//  * @param event The event to add to the document
//  * @param email The email address of the document to update
//  * @returns The Result from executing the statement
//  */
// async function addContactUpdatedEvent(txn, telephone, postcode, event, email) {
//   Log.debug(
//     `In the addContactUpdatedEvent function with telephone ${telephone} and postcode ${postcode}`
//   );
//   const statement =
//     "UPDATE BicycleLicence as b SET b.telephone = ?, b.postcode = ?, b.events = ? WHERE b.email = ?";
//   return txn.execute(statement, telephone, postcode, event, email);
// }

// /**
//  * Update the Licence document with an PointsAdded or PointsRemoved event
//  * @param email The email address of the document to update
//  * @param event The event to add
//  * @returns A JSON document to return to the client
//  */
// const updateLicence = async (email, eventInfo) => {
//   Log.debug(
//     `In updateLicence function with email ${email} and eventInfo ${eventInfo}`
//   );

//   let licence;
//   // Get a QLDB Driver instance
//   const qldbDriver = await getQldbDriver();
//   await qldbDriver.executeLambda(
//     async (txn) => {
//       // Get the current record

//       const result = await getLicenceRecordByEmail(txn, email);
//       const resultList = result.getResultList();

//       if (resultList.length === 0) {
//         throw new LicenceIntegrityError(
//           400,
//           "Licence Integrity Error",
//           `Licence record with email ${email} does not exist`
//         );
//       } else {
//         const originalLicence = JSON.stringify(resultList[0]);
//         const newLicence = JSON.parse(originalLicence);
//         const originalPoints = newLicence.penaltyPoints;

//         const updatedPoints = eventInfo.penaltyPoints;

//         let newPoints = null;
//         if (eventInfo.eventName === "PenaltyPointsAdded") {
//           newPoints = originalPoints + updatedPoints;
//         } else {
//           newPoints = originalPoints - updatedPoints;
//         }

//         const { events } = newLicence;
//         events.unshift(eventInfo);
//         await addEvent(txn, newPoints, events, email);
//         licence = {
//           email,
//           updatedPenaltyPoints: newPoints,
//         };
//       }
//     },
//     () => Log.info("Retrying due to OCC conflict...")
//   );
//   return licence;
// };

// /**
//  * Update the Licence document with new contact details
//  * @param telephone The updated telephone number
//  * @param postcode The updated postcode
//  * @param email The email address of the document to update
//  * @param event The event to add
//  * @returns A JSON document to return to the client
//  */
// const updateContact = async (telephone, postcode, email, eventInfo) => {
//   Log.debug(
//     `In updateContact function with telephone ${telephone} postcode ${postcode} email ${email} and eventInfo ${eventInfo}`
//   );

//   let licence;
//   // Get a QLDB Driver instance
//   const qldbDriver = await getQldbDriver();
//   await qldbDriver.executeLambda(
//     async (txn) => {
//       // Get the current record

//       const result = await getLicenceRecordByEmail(txn, email);
//       const resultList = result.getResultList();

//       if (resultList.length === 0) {
//         throw new LicenceIntegrityError(
//           400,
//           "Licence Integrity Error",
//           `Licence record with email ${email} does not exist`
//         );
//       } else {
//         const originalLicence = JSON.stringify(resultList[0]);
//         const newLicence = JSON.parse(originalLicence);
//         const { events } = newLicence;
//         events.unshift(eventInfo);

//         let newTelephone = telephone;
//         if (telephone === undefined) {
//           newTelephone = newLicence.telephone;
//         }

//         let newPostcode = postcode;
//         if (postcode === undefined) {
//           newPostcode = newLicence.postcode;
//         }

//         await addContactUpdatedEvent(
//           txn,
//           newTelephone,
//           newPostcode,
//           events,
//           email
//         );
//         licence = {
//           email,
//           response: "Contact details updated",
//         };
//       }
//     },
//     () => Log.info("Retrying due to OCC conflict...")
//   );
//   return licence;
// };

// /**
//  * Helper function to delete the document
//  * @param txn The {@linkcode TransactionExecutor} for lambda execute.
//  * @param id The document id of the document to delete
//  * @returns The Result from executing the statement
//  */
// async function deleteLicenceRecordById(txn, id) {
//   Log.debug("In deleteLicenceRecordById function");
//   const query = "DELETE FROM BicycleLicence AS b WHERE b.licenceId = ?";
//   return txn.execute(query, id);
// }

// /**
//  * Helper function to retrieve the current state of a licence record
//  * @param id The document id of the document to retrieve
//  * @returns The JSON document to return to the client
//  */
// const getLicence = async (id) => {
//   Log.debug(`In getLicence function with LicenceId ${id}`);

//   let licence;
//   // Get a QLDB Driver instance
//   const qldbDriver = await getQldbDriver();
//   await qldbDriver.executeLambda(
//     async (txn) => {
//       // Get the current record
//       const result = await getLicenceRecordById(txn, id);
//       const resultList = result.getResultList();

//       if (resultList.length === 0) {
//         throw new LicenceNotFoundError(
//           400,
//           "Licence Not Found Error",
//           `Licence record with LicenceId ${id} does not exist`
//         );
//       } else {
//         licence = JSON.stringify(resultList[0]);
//       }
//     },
//     () => Log.info("Retrying due to OCC conflict...")
//   );
//   return licence;
// };

// /**
//  * Function to delete a licence record
//  * @param id The document id of the document to delete
//  * @returns The JSON response to return to the client
//  */
// const deleteLicence = async (id) => {
//   Log.debug(`In deleteLicence function with LicenceId ${id}`);

//   let licence;
//   // Get a QLDB Driver instance
//   const qldbDriver = await getQldbDriver();
//   await qldbDriver.executeLambda(
//     async (txn) => {
//       // Get the current record
//       const result = await getLicenceRecordById(txn, id);
//       const resultList = result.getResultList();

//       if (resultList.length === 0) {
//         throw new LicenceNotFoundError(
//           400,
//           "Licence Not Found Error",
//           `Licence record with LicenceId ${id} does not exist`
//         );
//       } else {
//         await deleteLicenceRecordById(txn, id);
//         licence = '{"response": "Licence record deleted"}';
//       }
//     },
//     () => Log.info("Retrying due to OCC conflict...")
//   );
//   return licence;
// };

module.exports = {
  createTransaction
  // updateLicence,
  // getLicence,
  // updateContact,
  // deleteLicence,
};
