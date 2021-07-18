import React from 'react'
import DeckGL, {MapController} from 'deck.gl';
import {StaticMap} from 'react-map-gl';
import toast from "react-hot-toast";


const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_DEFAULT_PUBLIC_TOKEN
console.log("see me", MAPBOX_ACCESS_TOKEN)

function MapContent(props) {
    const {viewport, layers} = props
    console.log("== layers:", layers)

    function getTooltip({object}) {
        console.log("...getTooltip invoked")
        return (
            object &&
            `\
            ${object.name}
            Net gain: ${object.net}`
        );
    }

    window.setInterval(()=> toast.success("sup", {
        position:"top-left"
    }), 2000)

    const display = <DeckGL
        layers={layers}
        controller={{type: MapController, dragRotate: true}}
        initialViewState={viewport}
        getTootip={getTooltip}
    >
        <StaticMap
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}/>
    </DeckGL>

    return display;

}

export default MapContent;