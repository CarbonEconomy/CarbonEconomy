import {JURONG_HILL, SELETAR_TOWER} from "./SingaporeLocations"


export const INITIAL_VIEWPORT_ = {
    width: window.innerWidth,
    height: window.innerHeight,
    longitude: -3.2943888952729092,
    latitude: 53.63605986631115,
    zoom: 6,
    maxZoom: 16,
    pitch: 65,
    bearing: 0
}

export const INITIAL_VIEWPORT = {
    width: window.innerWidth,
    height: window.innerHeight,
    longitude: SELETAR_TOWER[1],
    latitude: SELETAR_TOWER[0],
    zoom: 10,
    maxZoom: 26,
    pitch: 65,
    bearing: 0
}