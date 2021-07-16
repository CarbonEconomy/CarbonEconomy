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

    // const tileLayer = new TileLayer({
    //     // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
    //     hexagonData: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
    //     minZoom: 0,
    //     maxZoom: 18,
    //     tileSize: 256,
    //
    //     renderSubLayers: (props) => {
    //         const {
    //             bbox: { west, south, east, north }
    //         } = props.tile;
    //
    //         return new BitmapLayer(props, {
    //             hexagonData: null,
    //             image: props.hexagonData,
    //             bounds: [west, south, east, north]
    //         });
    //     }
    // });

    console.log("first arcdata", arcData)
    const first = arcData[0]
    console.log("first startpoint:", first.start_point)
    console.log("first endpoint:", first.end_point)

    const arcLayer = new ArcLayer({
        id: 'arc-layer',
        arcData,
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

    const hexagonLayer = null

    // new HexagonLayer({
    //     id: "hexagon-layer",
    //     data: hexagonData,
    //     colorRange,
    //     radius: 50,
    //     extruded: true,
    //     elevationScale: 40,
    //     elevationRange: [0, 30],
    //     getPosition: (d) => {
    //         return d.position
    //     }
    // })

    const layers = [hexagonLayer, arcLayer];

    return layers;
}
