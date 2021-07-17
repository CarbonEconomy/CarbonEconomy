import React, {useEffect, useState} from 'react'
import DeckGL, {MapController} from 'deck.gl';
import {StaticMap} from 'react-map-gl';


const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_DEFAULT_PUBLIC_TOKEN
console.log("see me", MAPBOX_ACCESS_TOKEN)
const JURONG_HILL = [1.3181935040627233, 103.70845164296772]
const SELETAR_TOWER = [1.4030786091186036, 103.807320541631]
const DATA_URL = "../../public/heatmap-hexagonData.csv"

function MapContent(props) {
    const {viewport, layers} = props

    const display = <DeckGL
        layers={layers}
        controller={{type: MapController, dragRotate: true}}
        initialViewState={viewport}
    >
        <StaticMap
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>

    return display;

}

export default MapContent;