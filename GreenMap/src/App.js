import React, { useEffect, useState } from "react";
import DeckGL, { MapController } from "deck.gl";
import { renderLayers } from "./utils/RenderLayers";
import {StaticMap}from "react-map-gl"

import { csv } from "d3-fetch";
import {INITIAL_VIEWPORT} from "./utils/MapUtils/Viewports";
import {JURONG_HILL_} from "./utils/MapUtils/SingaporeLocations";
// const DATA_URL = "./heatmap-data.csv";
const DATA_URL = "./SingaporeLocations_smaller.csv";
require("dotenv").config()

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_DEFAULT_PUBLIC_TOKEN
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

    async function fetchData(){
        const result = await csv(DATA_URL);
        console.log("XXX data url:", DATA_URL)
        console.log("XXX contents:", result)

        let points = result.map(function (d) {
            return { position: [+d.lng, +d.lat] };
        });
        //
        // for (let i = 0; i < 1000; i++) {
        //     points.push({position: JURONG_HILL_})
        // }
        console.log("XXX hell lot of points:", points)
        setData(points);
    }

    const addJurongHill1000Times = (points) => {
        for (let i = 0; i < 1000; i++) {
           points.append({position: JURONG_HILL_})
        }
        return points
    }

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
        fetchData();
    }, []);


    //resize
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    console.log("XX token:", MAPBOX_ACCESS_TOKEN)
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
