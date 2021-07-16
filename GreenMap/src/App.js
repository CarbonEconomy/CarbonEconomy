import React, { useEffect, useState } from "react";
import DeckGL, { MapController } from "deck.gl";
import { renderLayers } from "./utils/RenderLayers";
import {StaticMap}from "react-map-gl"

import {INITIAL_VIEWPORT} from "./utils/MapUtils/Viewports";
import {fetchCsvData} from "./dataLoaders/LocationsLoader"
import {generateRandomGreenCredits} from "./utils/MockDataUtils/MockData";
import MapContent from "./pages/MapContent";

const App = () => {
    const [data, setData] = useState(null);
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    const [mockCredits, setMockCredits] = useState([])

    const handleResize = () => {
        setViewport((v) => {
            return {
                ...v,
                width: window.innerWidth,
                height: window.innerHeight
            };
        });
    };

    async function generateMockCredits(data) {
        let credits = generateRandomGreenCredits(data,1000)
        console.log("XX testing Credit Creation:", credits)
        setMockCredits(credits)
    }

    async function fetchData(){
        let data = await fetchCsvData()
        setData(data)
        setMockCredits(await generateMockCredits(data))
    }

    //loadfdata
    useEffect(() => {
        fetchData()
    }, []);

    //resize
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const layers = renderLayers({
        data: data
    })

    return (
        <div className="App">
            <MapContent viewport={viewport} layers={layers}/>
        </div>
    );
};

export default App;
