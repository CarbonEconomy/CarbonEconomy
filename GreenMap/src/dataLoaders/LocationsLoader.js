import parseApiData from "./ApiParser";
import {generateRandomTransactions} from "../utils/MockDataUtils/MockData";
import singaporeLocations from './SingaporeLocations.json';

export async function fetchTransactionsFlow() {
    const data = singaporeLocations.map(d => {
        return {position: [+d.lng, +d.lat]};
    });
    const transactions = await generateRandomTransactions(data, 1000)
    return parseApiData(transactions);
}
