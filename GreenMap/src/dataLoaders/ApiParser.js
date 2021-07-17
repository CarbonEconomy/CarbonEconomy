import {getJson} from "./LocationsLoader";

const verifyTransactionFieldsPresent = (transaction) => {
    if (!(transaction && transaction.amount && transaction.description)) return false
    const description = transaction.description;
    return (description.start
        && description.start.lat
        && description.start.lng
        && description.end
        && description.end.lat
        && description.end.lng)
};

// creates objects for Brushing Extension:
const parseApiData = (json) => {
    const locations = {};

    json.forEach((transaction) => {
        if (verifyTransactionFieldsPresent(transaction)) {
            const amount = parseInt(transaction.amount);
            const {start, end} = transaction.description;

            // use these as keys for points:
            const startPoint = `${start.lng},${start.lat}`;
            const endPoint = `${end.lng},${end.lat}`;

            // add start location:
            if (!locations[startPoint]) { // new data point:
                locations[startPoint] = {location: [start.lng, start.lat, 0]};
                locations[startPoint].outFlows = {};
                locations[startPoint].inFlow = 0; // inflows refer to credit balance
            }

            // add end location:
            if (!locations[endPoint]) {
                locations[endPoint] = {location: [end.lng, end.lat, 0]};
                locations[endPoint].outFlows = {};
                locations[endPoint].inFlow = 0;
            }


            // accumulate if exists:
            if (locations[startPoint].outFlows[endPoint]) {
                locations[startPoint].outFlows[endPoint] += amount;
            } else {
                locations[startPoint].outFlows[endPoint] = amount;
            }

            locations[endPoint].inFlow -= amount;
        }
    });
    return locations;
};

export default parseApiData;
