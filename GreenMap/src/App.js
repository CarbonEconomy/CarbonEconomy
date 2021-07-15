import React, { useEffect, useState } from "react";
import DeckGL, { MapController } from "deck.gl";
import { renderLayers } from "./utils/RenderLayers";
import {StaticMap}from "react-map-gl"

import { csv } from "d3-fetch";
import {INITIAL_VIEWPORT} from "./utils/MapUtils/Viewports";
import {JURONG_HILL_} from "./utils/MapUtils/SingaporeLocations";
import {fetchData} from "./dataLoaders/LocationsLoader"
import {generateRandomGreenCredits} from "./utils/MockDataUtils/MockData";

let credits = generateRandomGreenCredits(10)
console.log("XX testing Credit Creation:", credits)
// const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_DEFAULT_PUBLIC_TOKEN
//
// console.log("XX token:", MAPBOX_ACCESS_TOKEN)

function getTooltip({object}) {
    if (!object) {
        return null;
    }
    const lat = object.position[1];
    const lng = object.position[0];
    const count = object.points.length;

    return `\
    latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ''}
    longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ''}
    ${count} Accidents`;
}

const App = () => {
    const [data, setData] = useState({});
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

    const handleResize = () => {
        setViewport((v) => {
            return {
                ...v,
                width: window.innerWidth,
                height: window.innerHeight
            };
        });
    };

    //loadfdata
    useEffect(() => {
        fetchData(setData);
    }, []);


    //resize
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="App">
            <DeckGL
                layers={renderLayers({
                    data: data
                })}
                controller={{ type: MapController, dragRotate: true }}
                initialViewState={viewport}
                >
                <StaticMap
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    // mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
                    mapboxApiAccessToken={"pk.eyJ1IjoicnRzaGttciIsImEiOiJja3F3Z3RzOHMwMXgzMm9xdTU5ZTltMWk4In0.3QeM-It_jGjZKSB8BOcz_Q"} />
            </DeckGL>

        </div>
    );
};

export default App;
