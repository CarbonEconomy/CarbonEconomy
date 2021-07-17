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

const getRandomPoint = async (data) => {
    let points = data
    let point = points[Math.floor(Math.random() * points.length)]
    return point.position
}

const getRandomStartEndPoints = async (data) => {
    const [start_lng, start_lat] =  await getRandomPoint(data)
    const [end_lng, end_lat] =  await getRandomPoint(data)
    const startLocation = createLocation(start_lng, start_lat)
    const endLocation = createLocation(end_lng, end_lat)
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
    // console.log("== random metadata", messages[idx])
    return messages[idx]
}

const createRandomGreenCredit = async (data) => {
    const [start, end] = await getRandomStartEndPoints(data)
    const credit = createGreenCredit(
        start,
        end,
        getRandomTransferAmount(),
        getRandomMetadata()
    )
    // console.log("== random green credit", credit)
    return credit
}

export const generateRandomGreenCredits = async (data, count) => {
    let credits = []
    for (let idx = 0; idx < count; idx++) {
        const credit = await createRandomGreenCredit(data)
        credits.push(credit)
    }
    console.log("== generateRandomCredits, count(%s)", count, credits)
    return credits
}