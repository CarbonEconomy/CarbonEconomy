import {scaleLinear} from "d3-scale";

function getArcLayerProps(formattedData) {
    if (!formattedData || !Object.keys(formattedData).length) {
        return {};
    }

    const arcs = [];
    const targets = [];
    const sources = [];

    Object.keys(formattedData).forEach((sourcePoint) => {
        const { inFlow, outFlows, location } = formattedData[sourcePoint];
        const value = { gain: inFlow, loss: 0 };

        // create source points and arcs:
        Object.keys(outFlows).forEach((targetPoint) => {
            value.loss += outFlows[targetPoint];

            // add point at arc source
            sources.push({
                position: location,
                target: formattedData[targetPoint].location,
                name: targetPoint,
                radius: 3,
                gain: value.gain,
            });

            arcs.push({
                target: formattedData[targetPoint].location,
                source: location,
                value: outFlows[targetPoint],
            });
        });

        // add point at arc target
        targets.push({
            ...value,
            position: location,
            net: value.gain - value.loss,
            name: sourcePoint,
        });
    });

    // sort targets by radius large -> small
    targets.sort((a, b) => Math.abs(b.net) - Math.abs(a.net));
    const sizeScale = scaleLinear()
        .domain([0, Math.abs(targets[0].net)])
        .range([3, 10]);

    targets.forEach((pt) => {
        pt.radius = Math.sqrt(sizeScale(Math.abs(pt.net)));
    });

    return { arcs, targets, sources };
}

export default getArcLayerProps;