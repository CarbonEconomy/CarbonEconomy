import React from 'react'
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import {
    MAPBOX_RITESH_FIRST_TOKEN,
    MAPBOX_DEFAULT_PUBLIC_TOKEN
} from "../variables/tokens";

const JURONG_HILL = [1.3181935040627233, 103.70845164296772]
const SELETAR_TOWER = [1.4030786091186036, 103.807320541631]
// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: JURONG_HILL[1],
    latitude: JURONG_HILL[0],
    zoom: 13,
    pitch: 0,
    bearing: 0
};

// Data to be used by the LineLayer
const data = [
    {sourcePosition: [1.3181935040627233, 103.70845164296772], targetPosition: [1.4030786091186036, 103.807320541631]}
];

function MainContent() {
// DeckGL react component
    const layers = [
        new LineLayer({id: 'line-layer', data})
    ];

    return (<DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}>
        <StaticMap mapboxApiAccessToken={MAPBOX_DEFAULT_PUBLIC_TOKEN}/>
    </DeckGL>)

}

export default MainContent;