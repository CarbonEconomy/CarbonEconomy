import React from "react";
import DeckGL, { MapController } from "deck.gl";
import { StaticMap } from "react-map-gl";
import toast from "react-hot-toast";
import {Paper} from "@material-ui/core"

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_DEFAULT_PUBLIC_TOKEN;
console.log("see me", MAPBOX_ACCESS_TOKEN);

function MapContent(props) {
  const { viewport, layers } = props;
  console.log("== layers:", layers);

  const getTooltip = ({ object }) =>
    object && {
      html: `<h3>${object.name}</h3><h3>Net gain: ${object.net}</h3>`,
      style: {
        // background: 'linear-gradient(to right, orange , yellow, green, cyan, blue, violet)',
        fontSize: '0.8em'
      }
    };



  const display = (
    <DeckGL
      layers={layers}
      controller={{ type: MapController, dragRotate: true }}
      initialViewState={viewport}
      getTooltip={getTooltip}
    >
      <StaticMap
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  );

  return display;
}

export default MapContent;
