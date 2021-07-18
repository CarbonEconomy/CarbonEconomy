import React, {useEffect, useState} from "react";
import DeckGL, {MapController} from "deck.gl";
import {renderLayers} from "./utils/RenderLayers";
import {StaticMap} from "react-map-gl"

import {BrushingExtension} from '@deck.gl/extensions';
import {INITIAL_VIEWPORT} from "./utils/MapUtils/Viewports";
import {fetchArcData, fetchHexagonData, getJson} from "./dataLoaders/LocationsLoader"
import {generateRandomTransactions} from "./utils/MockDataUtils/MockData";
import MapContent from "./pages/MapContent";
import getArcLayerProps from "./dataLoaders/BrushingDataLoader";
import parseApiData from "./dataLoaders/ApiParser";


const brushingExtension = new BrushingExtension();

const App = () => {
    const [hexagonData, setHexagonData] = useState(null);
    const [arcData, setArcData] = useState(null);
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    const [mockTransactions, setMockTransactions] = useState(null)

    const handleResize = () => {
        setViewport((v) => {
            return {
                ...v,
                width: window.innerWidth,
                height: window.innerHeight
            };
        });
    };

    async function fetchHexagonLayerData() {
        let hexagonData = await fetchHexagonData()
        const pre = (await generateRandomTransactions(hexagonData, 1000))
        let mockCredits = parseApiData(pre)
        let arcData = getArcLayerProps(mockCredits)
        console.log(">>> pre: ", pre)
        console.log(">>> post mockcredits after parsing: ", mockCredits)
        console.log(">>> arc data after getting props: ", arcData)
        setMockTransactions(mockCredits)
        setHexagonData(hexagonData)
        setArcData(arcData)
    }

    async function fetchArcLayerData() {
        let arcData = await fetchArcData()
        console.log("=== arcData", arcData)
        const layerRequirements = getArcLayerProps(arcData)
        setArcData(layerRequirements)
    }

    //loadfdata
    useEffect(() => {
        fetchHexagonLayerData()
    }, []);


    //resize
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div className="App">
            {(mockTransactions === null || hexagonData === null || arcData == null)
                ? <p> loading spinner ... </p>
                : <MapContent
                    viewport={viewport}
                    layers={renderLayers({
                        hexagonData: hexagonData,
                        arcData: mockTransactions,
                        brushingData: arcData,
                        brushingExtension: brushingExtension,
                    })}/>
            }
        </div>
    );
};

export default App;
