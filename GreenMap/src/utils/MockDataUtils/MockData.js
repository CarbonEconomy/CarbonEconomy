import {fetchCsvData, getCsvData, getPoints} from "../../dataLoaders/LocationsLoader";

// const singaporePoints = (async () => {await fetchCsvData()})()
// const singaporePoints = fetchCsvData()
let singaporePoints = fetchCsvData();

function createLocation(lng, lat) { //
    return {long: lng, lat: lat}
}

function createGreenCredit(startPt, endPt, transferAmount, metadata) {
    return {
        start_point: startPt,
        end_point: endPt,
        transferAmount: transferAmount,
        metadata: metadata
    }
}

const getRandomPoint = async () => {
    console.log("XXX singapore points", await singaporePoints)
    let points = await singaporePoints
    console.log("XXX singapore points variable", points)
    let point = points[Math.floor(Math.random() * points.length)]
    console.log("== randomPoint ", point)
    return point.position
}

const getRandomStartEndPoints = async () => {
    const [start_lng, start_lat] =  await getRandomPoint()
    const [end_lng, end_lat] =  await getRandomPoint()
    const startLocation = createLocation(start_lng, start_lat)
    const endLocation = createLocation(end_lng, end_lat)
    console.log("== random start end points", startLocation, endLocation)
    return [startLocation, endLocation]
}

const getRandomTransferAmount = () => {
    const MIN_AMT = 200
    const MAX_AMT = 500
    return Math.floor(Math.random() * (MAX_AMT - MIN_AMT) + MIN_AMT)
}

const getRandomMetadata = () => {
    let messages = [
        "chose 5 day shipping instead of same-day air delivery",
        "delivery by bicycle instead of motorbike"
    ]
    const idx = Math.floor(Math.random() * messages.length)
    console.log("== random metadata", messages[idx])
    return messages[idx]
}

const createRandomGreenCredit = async () => {
    const [start, end] = await getRandomStartEndPoints()
    const credit = createGreenCredit(
        start,
        end,
        getRandomTransferAmount(),
        getRandomMetadata()
    )
    console.log("== random green credit", credit)
    return credit
}

export const generateRandomGreenCredits = (count) => {
    let credits = []
    for (let idx = 0; idx < count; idx++) {
        const credit = createRandomGreenCredit()
        credits.push(credit)
    }
    console.log("== generateRandomCredits, count(%s)", count, credits)
    return credits
}