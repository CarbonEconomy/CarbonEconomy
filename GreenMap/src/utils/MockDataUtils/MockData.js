let faker = require('faker')

function createCoordinate(lng, lat) { //
    return {lng: lng, lat: lat}
}

function createTransactionDescription(start, end, mode) {
    return {
        start:start,
        end: end,
        mode: mode
    }
}

function createTransaction(fromID, toID, amount, description) {
    return {
        fromID:fromID,
        toID:toID,
        amount:amount,
        description: description,
    }
}

// function createTransaction_(startPt, endPt, transferAmount, metadata) {
//     return {
//         start: startPt,
//         end: endPt,
//         amount: transferAmount,
//         mode: metadata
//     }
// }

const getRandomPoint = async (data) => {
    let points = data
    let point = points[Math.floor(Math.random() * points.length)]
    return point.position
}

const getRandomStartEndPoints = async (data) => {
    const [start_lng, start_lat] =  await getRandomPoint(data)
    const [end_lng, end_lat] =  await getRandomPoint(data)
    const startLocation = createCoordinate(start_lng, start_lat)
    const endLocation = createCoordinate(end_lng, end_lat)
    return [startLocation, endLocation]
}

const getRandomTransferAmount = () => {
    const MIN_AMT = 200
    const MAX_AMT = 500
    return Math.floor(Math.random() * (MAX_AMT - MIN_AMT) + MIN_AMT)
}

const getRandomMode = () => {
    let messages = [
        "chose 5 day shipping instead of same-day air delivery",
        "delivery by bicycle instead of motorbike"
    ]
    const idx = Math.floor(Math.random() * messages.length)
    return messages[idx]
}

const createRandomTransaction = async (data) => {
    // create random description:
    const [start, end] = await getRandomStartEndPoints(data)
    const mode = getRandomMode()
    const description = createTransactionDescription(start, end, mode)
    console.log(">> txn description: ", description)
    const fromID = faker.datatype.uuid()
    const toID = faker.datatype.uuid()
    console.log(">> from ID: %s, toID: %s", fromID, toID)
    const transferAmount = getRandomTransferAmount()
    const txn = createTransaction(fromID, toID, transferAmount, description)
    console.log(">> new txn", txn)
    return txn
}
//
// const createRandomTransaction_ = async (data) => {
//     const newTxn = await createRandomTransaction_(data)
//     // create random description:
//     const [start, end] = await getRandomStartEndPoints(data)
//     const mode = getRandomMode()
//     const description = createTransactionDescription(start, end, mode)
//     const fromID = faker.datatype.uuid()
//     const toID = faker.datatype.uuid()
//     const transferAmount = getRandomTransferAmount()
//     const txn = createTransaction_(fromID, toID, transferAmount, description)
//
//     const transaction = createTransaction(
//         start,
//         end,
//         getRandomTransferAmount(),
//         getRandomMode()
//     )
//     return transaction
// }

export const generateRandomTransactions = async (data, count) => {
    let credits = []
    for (let idx = 0; idx < count; idx++) {
        const credit = await createRandomTransaction(data)
        credits.push(credit)
    }
    console.log("== generateRandomCredits, count(%s)", count, credits)
    return credits
}