const verifyTransactionFieldsPresent = (transaction) => {
  const hasCorrectOuterFields =
    transaction && transaction.amount && transaction.description;
  if (!hasCorrectOuterFields) return false;
  const description = transaction.description;
  // ensure correct description fields:
  return (
    description.start &&
    description.start.lat &&
    description.start.lng &&
    description.end &&
    description.end.lat &&
    description.end.lng
  );
};

// parses json transaction data into flow data representing flow of green credits:
const parseApiData = (transactions) => {
  console.log("... from api, json for transactions:", transactions);
  const locations = {};

  transactions.forEach((transaction) => {
    if (verifyTransactionFieldsPresent(transaction)) {
      const amount = parseInt(transaction.amount);
      const { start, end } = transaction.description;

      // use these as keys for points:
      const startPoint = `${start.lng},${start.lat}`;
      const endPoint = `${end.lng},${end.lat}`;

      // add start location:
      if (!locations[startPoint]) {
        // new data point:
        locations[startPoint] = { location: [start.lng, start.lat, 0] };
        locations[startPoint].outFlows = {};
        locations[startPoint].inFlow = 0; // inflows refer to credit balance
      }

      // add end location:
      if (!locations[endPoint]) {
        locations[endPoint] = { location: [end.lng, end.lat, 0] };
        locations[endPoint].outFlows = {};
        locations[endPoint].inFlow = 0;
      }

      // accumulate if exists:
      if (locations[startPoint].outFlows[endPoint]) {
        locations[startPoint].outFlows[endPoint] += amount;
      } else {
        locations[startPoint].outFlows[endPoint] = amount;
      }

      locations[endPoint].inFlow += amount;
    }
  });
  console.log(">>> after parsing, locations:", locations);
  return locations;
};

export default parseApiData;
