import {HexagonLayer, TileLayer, BitmapLayer} from "deck.gl";
import {ArcLayer, ScatterplotLayer} from "@deck.gl/layers";
import {BrushingExtension} from '@deck.gl/extensions';
import {useMemo} from "react";
import {fetchArcData} from "../dataLoaders/LocationsLoader";

const colorRange = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
];

// transaction out
const SOURCE_COLOR = [166, 3, 3];
// transaction in
const TARGET_COLOR = [35, 184, 40];
const BRUSH_RADIUS = 1000;
const STROKE_WIDTH = 5;
const OPACITY = 0.7;
const ENABLE_BRUSHING = true;

// const brushingExtension = new BrushingExtension();

export function renderLayers(props) {
    const {hexagonData, arcData, brushingData, brushingExtension} = props;
    const {arcs, targets, sources} = brushingData
    console.log("HexagonData:", hexagonData)
    console.log("arcData", arcData)
    console.log("brushingData", brushingData)


    // const arcLayer = arcData
    //     && new ArcLayer({
    //         id: 'arc-layer',
    //         data: arcData,
    //         getSourcePosition: d => {
    //             const {long, lat} = d.start_point
    //             return [long, lat]
    //         },
    //         getTargetPosition: d => {
    //             const {long, lat} = d.end_point
    //             return [long, lat]
    //         },
    //         getWidth: STROKE_WIDTH,
    //         OPACITY,
    //         brushingRadius: BRUSH_RADIUS,
    //         brushingEnabled: true,
    //         getSourceColor: SOURCE_COLOR,
    //         getTargetColor: TARGET_COLOR,
    //         extensions: [brushingExtension]
    //     })

    const hexagonLayer = hexagonData
        && new HexagonLayer({
            id: "hexagon-layer",
            data: hexagonData,
            colorRange,
            radius: 20,
            extruded: true,
            elevationScale: 40,
            elevationRange: [0, 30],
            getPosition: (d) => {
                return d.position
            }
        })

    const brushingLayers = arcs && targets && [
        new ScatterplotLayer({
            id: "sources",
            data: sources,
            brushingRadius: BRUSH_RADIUS,
            brushingEnabled: ENABLE_BRUSHING,
            // only show source points when brushing
            radiusScale: ENABLE_BRUSHING ? 60 : 0,
            getFillColor: (d) => (d.gain > 0 ? TARGET_COLOR : SOURCE_COLOR),
            extensions: [brushingExtension],
        }),
        new ScatterplotLayer({
            id: "targets-ring",
            data: targets,
            brushingRadius: BRUSH_RADIUS,
            lineWidthMinPixels: 2,
            stroked: true,
            filled: false,
            brushingEnabled: ENABLE_BRUSHING,
            // only show rings when brushing
            radiusScale: ENABLE_BRUSHING ? 120 : 0,
            getLineColor: (d) => (d.net > 0 ? TARGET_COLOR : SOURCE_COLOR),
            extensions: [brushingExtension],
        }),
        new ScatterplotLayer({
            id: "targets",
            data: targets,
            brushingRadius: BRUSH_RADIUS,
            brushingEnabled: ENABLE_BRUSHING,
            pickable: true,
            radiusScale: 60,
            getFillColor: (d) => (d.net > 0 ? TARGET_COLOR : SOURCE_COLOR),
            extensions: [brushingExtension],
        }),
        new ArcLayer({
            id: "brushing-arc",
            data: arcs,
            getWidth: STROKE_WIDTH,
            OPACITY,
            brushingRadius: BRUSH_RADIUS,
            brushingEnabled: ENABLE_BRUSHING,
            getSourcePosition: (d) => d.source,
            getTargetPosition: (d) => d.target,
            getSourceColor: SOURCE_COLOR,
            getTargetColor: TARGET_COLOR,
            extensions: [brushingExtension],
        }),
    ]


    // const ret = brushingLayers
    // console.log("ret", ret)
    // return ret
    return [hexagonLayer/*, arcLayer*/].concat(brushingLayers);
}
