import {csv, json} from "d3-fetch";
import parseApiData from "./ApiParser";
import {generateRandomTransactions} from "../utils/MockDataUtils/MockData";

const SINGAPORE_LOCATIONS_DATA_URL = "/SingaporeLocations_.csv";

export async function fetchTransactionsFlow() {
    return parseApiData(await csv(SINGAPORE_LOCATIONS_DATA_URL)
        .then(csvContent => {
            let mapped = csvContent.map(function (d) {
                return {position: [+d.lng, +d.lat]};
            })
            return mapped
        })
        .then(mapped => {
            return generateRandomTransactions(mapped, 1000)
        })
        .catch(error => {
            console.log("we got an error boiss", error)
        }))
    // .map(function (d) {
    //     return {position: [+d.lng, +d.lat]};
    // });
    // const transactions = await generateRandomTransactions(csvContent, 1000)
    // return parseApiData(transactions);
}

