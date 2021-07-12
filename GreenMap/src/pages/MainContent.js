import React, {useEffect, useState} from 'react'
import DeckGL, {MapController} from 'deck.gl';
import {LineLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import {csv} from "d3-fetch";
import {Deck} from "@deck.gl/core";
import {renderLayers} from "../utils/RenderLayers";


require('dotenv').config()
const MAPBOX_DEFAULT_PUBLIC_TOKEN = process.env.MAPBOX_DEFAULT_PUBLIC_TOKEN
const JURONG_HILL = [1.3181935040627233, 103.70845164296772]
const SELETAR_TOWER = [1.4030786091186036, 103.807320541631]
const DATA_URL = "../../public/heatmap-data.csv"
// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: JURONG_HILL[1],
    latitude: JURONG_HILL[0],
    zoom: 13,
    pitch: 0,
    bearing: 0
};

const INITIAL_VIEWPORT = {
    width: window.innerWidth,
    height: window.innerHeight,
    longitude: -3.2943888952729092,
    latitude: 53.63605986631115,
    zoom: 6,
    maxZoom: 16,
    pitch: 65,
    bearing: 0
}

// Data to be used by the LineLayer
const data = [
    {sourcePosition: [1.3181935040627233, 103.70845164296772], targetPosition: [1.4030786091186036, 103.807320541631]}
];


function MainContent() {
    const [data, setData] = useState({});
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT)

    async function fetchData() {
        const result = await csv(DATA_URL);
        const points = result.map(function (d) {
            return {position: [+d.lng, +d.lat]};
        });
        setData(points);
    }


    async function handleWindowResize() {
        setViewport((v) => {
            return {
                ...v,
                width: window.innerWidth,
                height: window.innerHeight
            };
        });
    }


    // data fetching:
    useEffect(() => {
        fetchData();
    }, []);


    // handle resizing of window:
    useEffect(() => {
        handleWindowResize()
        window.addEventListener("resize", handleWindowResize)
        return () => window.removeEventListener("resize", handleWindowResize);
    })


// DeckGL react component
    const layers = [
        new LineLayer({id: 'line-layer', data})
    ];
    //
    // return (<DeckGL
    //     initialViewState={INITIAL_VIEW_STATE}
    //     controller={true}
    //     layers={layers}>
    //     <StaticMap mapboxApiAccessToken={MAPBOX_DEFAULT_PUBLIC_TOKEN}/>
    // </DeckGL>)



    return (
            <DeckGL
                layers={renderLayers({
                    data: data
                })}
                controller={{type: MapController, dragRotate: false}}
                initialViewState={viewport}>
            </DeckGL>
    );

}

export default MainContent;