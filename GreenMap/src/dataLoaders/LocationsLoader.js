import {csv, json} from "d3-fetch";
import parseApiData from "./ApiParser";
import {generateRandomTransactions} from "../utils/MockDataUtils/MockData";

const SINGAPORE_LOCATIONS_DATA_URL = "./SingaporeLocations_.csv";

export async function fetchTransactionsFlow() {
    const csvContent = (await csv(SINGAPORE_LOCATIONS_DATA_URL))
        .map(function (d) {
            return {position: [+d.lng, +d.lat]};
        });
    const transactions = await generateRandomTransactions(csvContent, 1000)
    return parseApiData(transactions);
}

