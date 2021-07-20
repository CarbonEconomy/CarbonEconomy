import faker from "faker";

function createTransactionDescription(start, end, mode) {
  return {
    start: start,
    end: end,
    mode: mode,
  };
}

function createTransaction(fromID, toID, amount, description) {
  return {
    fromID: fromID,
    toID: toID,
    amount: amount,
    description: description,
  };
}

const getRandomPoint = async (data) => {
  let points = data;
  let point = points[Math.floor(Math.random() * points.length)];
  if (!point) throw Error("we messed up somewhere");
  return point;
};

const getRandomStartEndPoints = async (data) => {
  const startLocation = await getRandomPoint(data);
  const endLocation = await getRandomPoint(data);
  return [startLocation, endLocation];
};

const getRandomTransferAmount = () => {
  const MIN_AMT = 200;
  const MAX_AMT = 500;
  return Math.floor(Math.random() * (MAX_AMT - MIN_AMT) + MIN_AMT);
};

const getRandomMode = () => {
  let messages = [
    "chose 5 day shipping instead of same-day air delivery",
    "delivery by bicycle instead of motorbike",
  ];
  const randIdx = Math.floor(Math.random() * messages.length);
  return messages[randIdx];
};

const createRandomTransaction = async (data) => {
  const [start, end] = await getRandomStartEndPoints(data);
  const mode = getRandomMode();
  const description = createTransactionDescription(start, end, mode);
  const fromID = faker.datatype.uuid();
  const toID = faker.datatype.uuid();
  const transferAmount = getRandomTransferAmount();
  return createTransaction(fromID, toID, transferAmount, description);
};

export const generateRandomTransactions = async (data, count) => {
  let credits = [];
  for (let idx = 0; idx < count; idx++) {
    const credit = await createRandomTransaction(data);
    credits.push(credit);
  }
  console.log("== generateRandomTransactions, count(%s)", count, credits);
  return credits;
};
