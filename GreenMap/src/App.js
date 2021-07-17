import React, {useEffect, useState} from "react";
import DeckGL, {MapController} from "deck.gl";
import {renderLayers} from "./utils/RenderLayers";
import {StaticMap} from "react-map-gl"

import {BrushingExtension} from '@deck.gl/extensions';
import {INITIAL_VIEWPORT} from "./utils/MapUtils/Viewports";
import {fetchCsvData} from "./dataLoaders/LocationsLoader"
import {generateRandomGreenCredits} from "./utils/MockDataUtils/MockData";
import MapContent from "./pages/MapContent";


const brushingExtension = new BrushingExtension();

const App = () => {
    const [data, setData] = useState(null);
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    const [mockCredits, setMockCredits] = useState(null)

    const handleResize = () => {
        setViewport((v) => {
            return {
                ...v,
                width: window.innerWidth,
                height: window.innerHeight
            };
        });
    };

    async function fetchData() {
        let data = await fetchCsvData()
        setMockCredits(await generateRandomGreenCredits(data, 1000))
        setData(data)
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


    return (
        <div className="App">
            {(mockCredits === null || data === null)
                ? <p> loading spinner ... </p>
                : <MapContent
                    viewport={viewport}
                    layers={renderLayers({
                        hexagonData: data,
                        arcData: mockCredits
                    })}/>
            }
        </div>
    );
};

export default App;
