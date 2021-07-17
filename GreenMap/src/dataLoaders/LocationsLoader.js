import {csv, json} from "d3-fetch";
import parseApiData from "./ApiParser";

const HEXAGON_DATA_URL = "./SingaporeLocations_.csv";
const BRUSHING_DATA_URL = "./sampleApiResponse.json"

export async function fetchHexagonData() {
    const result = await csv(HEXAGON_DATA_URL);
    return result.map(function (d) {
        return {position: [+d.lng, +d.lat]};
    })
}

export async function fetchArcData() {
    return parseApiData( await json(BRUSHING_DATA_URL))
}
