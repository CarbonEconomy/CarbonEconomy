import { generateRandomTransactions } from "../utils/MockDataUtils/MockData";
import singaporeLocations from "./SingaporeLocations.json";
import axios from "axios";
import { verifyTransactionFieldsPresent } from "./ApiParser";

const fetchTransactionData = async () => {
  try {
    const res = axios.get(
      `https://fv1au9jx9a.execute-api.us-east-1.amazonaws.com/dev/transaction`
    );

    return await res;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export async function fetchTransactions() {
  const data = singaporeLocations.map((d) => {
    const result = { lng: +d.lng, lat: +d.lat };
    if (d.address) {
      result.address = d.address;
    }
    return result;
  });

  const mockTransactionsPromise = generateRandomTransactions(data, 1000);
  const actualTransactionsPromise = fetchTransactionData();

  const allPromises = Promise.allSettled([
    mockTransactionsPromise,
    actualTransactionsPromise,
  ]);

  const transactions = await allPromises;
  const mockTransactions = transactions[0].value;

  if (transactions[1].value) {
    const actualTransactions = transactions[1].value.data.filter((x) =>
      verifyTransactionFieldsPresent(x)
    );
    return mockTransactions.concat(actualTransactions);
  }

  return mockTransactions;
}
