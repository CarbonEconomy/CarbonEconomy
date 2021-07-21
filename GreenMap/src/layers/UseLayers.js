import { HexagonLayer } from "deck.gl";
import { ArcLayer, ScatterplotLayer } from "@deck.gl/layers";
import { BrushingExtension } from "@deck.gl/extensions";
import getArcLayerProps from "../dataLoaders/FlowDataFormatter";
import { useMemo } from "react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";

const colorRange = [
  [1, 152, 189],
  // [73, 227, 206],
  // [216, 254, 181],
  // [254, 237, 177],
  // [254, 173, 84],
  // [209, 55, 78]
];

const heatmapColorRange = [
  [240, 249, 232],
  [204, 235, 197],
  [168, 221, 181],
  [123, 204, 196],
  [67, 162, 202],
  [8, 104, 172],
];

// transaction out
const SOURCE_COLOR = [166, 3, 3];
// transaction in
const TARGET_COLOR = [35, 184, 40];
const TRANSPARENT_COLOR = [0, 0, 0, 0];
const BRUSH_RADIUS = 1000;
const STROKE_WIDTH = 5;
const OPACITY = 0.7;
const ENABLE_BRUSHING = true;
const HEXAGON_RADIUS = 20;
const HEXAGON_ELEVATION_SCALE = 2;

// todo: how to convert this into a custom react hook so that useMemo() can be used to reduce load time?
export function useLayers(props) {
  const { transactionsFlow, enabled } = props;
  const { arcs, targets, sources } = useMemo(
    () => getArcLayerProps(transactionsFlow),
    transactionsFlow
  );
  if (!transactionsFlow) return null;
  // const {arcs, targets, sources} = useMemo(() => getArcLayerProps(transactionsFlow), [transactionsFlow]) // todo: see todo above
  console.log(
    "transactionsFlow to be used for rendering layers",
    transactionsFlow
  );
  const transactionEntries = Object.entries(transactionsFlow);
  const brushingExtension = new BrushingExtension();

  const hexagonLayer =
    transactionsFlow &&
    new HexagonLayer({
      id: "hexagon-layer",
      data: transactionEntries.filter((x) => x[1].inFlow !== 0),
      colorRange,
      radius: HEXAGON_RADIUS,
      extruded: true,
      elevationScale: HEXAGON_ELEVATION_SCALE,
      getPosition: (transactionEntry) => {
        const [lngString, latString] = transactionEntry[1].location;
        return [lngString, latString];
      },
      // getElevationWeight & elevationAggregation strategy determine stack height:
      getElevationWeight: (transactionEntry) => {
        const value = transactionEntry[1];
        const elevationVal = Math.abs(value.inFlow); // todo: inflows should determine stack height
        return elevationVal;
      },
      elevationAggregation: "SUM",
    });

  const heatmapLayer = new HeatmapLayer({
    id: "heatmapLayer",
    data: transactionEntries,
    getPosition: (transactionEntry) => {
      const [lngString, latString] = transactionEntry[1].location;
      return [lngString, latString];
    },
    getWeight: (transactionEntry) => {
      const value = transactionEntry[1];
      const elevationVal = Math.abs(value.inFlow); // todo: inflows should determine stack height
      return elevationVal;
    },
    colorRange: heatmapColorRange,
    intensity: 3,
    radiusPixels: 100,
    aggregation: "MEAN",
    visible: enabled.heatmap
  });

  // const sourcesLayer = sources && new ScatterplotLayer({
  //     id: "sources",
  //     data: sources,
  //     brushingRadius: BRUSH_RADIUS,
  //     brushingEnabled: ENABLE_BRUSHING,
  //     // only show source points when brushing
  //     radiusScale: 30,
  //     getFillColor: (d) => (d.gain > 0 ? TARGET_COLOR : TRANSPARENT_COLOR),
  //     extensions: [brushingExtension],
  // })

  const targetsRingLayer =
    targets &&
    new ScatterplotLayer({
      id: "targets-ring",
      data: targets,
      brushingRadius: BRUSH_RADIUS,
      lineWidthMinPixels: 2,
      stroked: true,
      filled: false,
      brushingEnabled: ENABLE_BRUSHING,
      // only show rings when brushing
      radiusScale: ENABLE_BRUSHING ? 60 : 0,
      getLineColor: (d) => (d.gain > 0 ? TARGET_COLOR : TRANSPARENT_COLOR),
      extensions: [brushingExtension],
    });

  const targetsLayer =
    targets &&
    new ScatterplotLayer({
      id: "targets",
      data: targets,
      brushingRadius: BRUSH_RADIUS,
      brushingEnabled: ENABLE_BRUSHING,
      pickable: true,
      radiusScale: ENABLE_BRUSHING ? 30 : 0,
      getFillColor: (d) => (d.gain > 0 ? TARGET_COLOR : TRANSPARENT_COLOR),
      extensions: [brushingExtension],
    });

  const creditFlowsArcLayer =
    arcs &&
    new ArcLayer({
      id: "brushing-arc",
      data: arcs,
      getWidth: STROKE_WIDTH,
      OPACITY,
      brushingRadius: BRUSH_RADIUS,
      brushingEnabled: ENABLE_BRUSHING,
      // Source and Target swapped deliberately
      getSourcePosition: (d) => d.target,
      getTargetPosition: (d) => d.source,
      getSourceColor: TARGET_COLOR,
      getTargetColor: SOURCE_COLOR,
      extensions: [brushingExtension],
      visible: enabled.arcs
    });
  

  const layers = [
    hexagonLayer,
    // sourcesLayer,
    targetsLayer,
    targetsRingLayer,
    creditFlowsArcLayer,
    heatmapLayer
  ]

  return layers;
}
