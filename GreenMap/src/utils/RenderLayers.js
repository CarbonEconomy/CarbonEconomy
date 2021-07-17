import {HexagonLayer, TileLayer, BitmapLayer} from "deck.gl";
import {ArcLayer} from "@deck.gl/layers";
import {BrushingExtension} from '@deck.gl/extensions';

const colorRange = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
];

// migrate out
const SOURCE_COLOR = [166, 3, 3];
// migrate in
const TARGET_COLOR = [35, 181, 184];
const BRUSH_RADIUS = 100000;
const STROKE_WIDTH = 1;
const OPACITY = 0.7;

const brushingExtension = new BrushingExtension();

export function renderLayers(props) {
    const {hexagonData, arcData} = props;
    console.log("HexagonData:", hexagonData)
    console.log("arcData", arcData)


    const arcLayer = new ArcLayer({
        id: 'arc-layer',
        data: arcData,
        getSourcePosition: d => {
            const {long, lat} = d.start_point
            console.log("XXX getting source: long: %s, lat: %s", long, lat)
            return [long, lat]
        },
        getTargetPosition: d => {
            const {long, lat} = d.end_point
            return [long, lat]
        },
        getWidth: STROKE_WIDTH,
        OPACITY,
        brushingRadius: BRUSH_RADIUS,
        brushingEnabled: true,
        getSourceColor: SOURCE_COLOR,
        getTargetColor: TARGET_COLOR,
        extensions: [brushingExtension]
    })

    const hexagonLayer = new HexagonLayer({
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


    return [hexagonLayer, arcLayer];
}
