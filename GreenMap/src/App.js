import React, { useEffect, useState } from "react";
import DeckGL, { MapController } from "deck.gl";
import { renderLayers } from "./utils/RenderLayers";

import { csv } from "d3-fetch";
import {INITIAL_VIEWPORT} from "./utils/MapUtils/Viewports";
const DATA_URL = "./heatmap-data.csv";

const App = () => {
    const [data, setData] = useState({});
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

    async function fetchData(){
        const result = await csv(DATA_URL);
        const points = result.map(function (d) {
            return { position: [+d.lng, +d.lat] };
        });
        setData(points);
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

    return (
        <div className="App">
            <DeckGL
                layers={renderLayers({
                    data: data
                })}
                controller={{ type: MapController, dragRotate: false }}
                initialViewState={viewport}
            />
        </div>
    );
};

export default App;
