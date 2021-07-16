import React, {useEffect, useState} from "react";
import DeckGL, {MapController} from "deck.gl";
import {renderLayers} from "./utils/RenderLayers";
import {StaticMap} from "react-map-gl"

import {BrushingExtension} from '@deck.gl/extensions';
import {INITIAL_VIEWPORT} from "./utils/MapUtils/Viewports";
import {fetchCsvData} from "./dataLoaders/LocationsLoader"
import {generateRandomGreenCredits} from "./utils/MockDataUtils/MockData";
import MapContent from "./pages/MapContent";

// Source hexagonData GeoJSON
const DATA_URL =
    'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/arc/counties.json'; // eslint-disable-line

export const inFlowColors = [[35, 181, 184]];
export const outFlowColors = [[166, 3, 3]];

// migrate out
const SOURCE_COLOR = [166, 3, 3];
// migrate in
const TARGET_COLOR = [35, 181, 184];

const INITIAL_VIEW_STATE = {
    longitude: -100,
    latitude: 40.7,
    zoom: 3,
    maxZoom: 15,
    pitch: 0,
    bearing: 0
};

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

    async function generateMockCredits(data) {
        let credits = generateRandomGreenCredits(data, 1000)
        console.log("XX testing Credit Creation:", credits)
        setMockCredits(credits)
    }

    async function fetchData() {
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


    return (
        <div className="App">
            {(!mockCredits || !data)
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
