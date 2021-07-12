import React, { useEffect, useState } from "react";
import DeckGL, { MapController } from "deck.gl";
import { renderLayers } from "./utils/RenderLayers";

import { csv } from "d3-fetch";
const DATA_URL = "./heatmap-data.csv";

const App = () => {
    const [data, setData] = useState({});

    //loadfdata
    useEffect(() => {
        const fetchData = async () => {
            const result = await csv(DATA_URL);
            const points = result.map(function (d) {
                return { position: [+d.lng, +d.lat] };
            });
            setData(points);
        };

        fetchData();
    }, []);

    const [viewport, setViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        longitude: -3.2943888952729092,
        latitude: 53.63605986631115,
        zoom: 6,
        maxZoom: 16,
        pitch: 65,
        bearing: 0
    });

    //resize
    useEffect(() => {
        const handleResize = () => {
            setViewport((v) => {
                return {
                    ...v,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            });
        };
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
            <div className="attribution">
                <a
                    href="https://maps.gsi.go.jp/development/ichiran.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    地理院タイル
                </a>
            </div>
        </div>
    );
};

export default App;
