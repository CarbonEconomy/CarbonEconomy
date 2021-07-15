import {csv} from "d3-fetch";

const DATA_URL = "./SingaporeLocations_.csv";

export async function fetchCsvData() {
    const result = await csv(DATA_URL);
    let points = result.map(function (d) {
        return {position: [+d.lng, +d.lat]};
    });
    return points
}

export const getPoints = async () => {
    let points = await fetchCsvData()
    console.log("XXX points", points)
    return points
}

export function getCsvData() {
    const result = csv(DATA_URL);
    let points = result.map(function (d) {
        return {position: [+d.lng, +d.lat]};
    });
    return points
}

export function fetchData(setterFn) {
    setterFn(fetchCsvData());
}


