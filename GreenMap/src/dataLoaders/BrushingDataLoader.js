/**
 * TODO: GREEN CREDIT HAS THE DATA TO MAKE THIS WORK, WILL TRY AFTER GETTING ARC LAYER DONE FIRST
 */
import {scaleLinear} from 'd3-scale';

function getLayerData(data) {
    if (!data || !data.length) {
        return {};
    }
    const arcs = [];
    const targets = [];
    const sources = [];
    const pairs = {};

    data.forEach((county, i) => {
        const {flows, centroid: targetCentroid} = county.properties;
        const value = {gain: 0, loss: 0};

        Object.keys(flows).forEach(toId => {
            value[flows[toId] > 0 ? 'gain' : 'loss'] += flows[toId];

            // if number too small, ignore it
            if (Math.abs(flows[toId]) < 50) {
                return;
            }
            const pairKey = [i, Number(toId)].sort((a, b) => a - b).join('-');
            const sourceCentroid = data[toId].properties.centroid;
            const gain = Math.sign(flows[toId]);

            // add point at arc source
            sources.push({
                position: sourceCentroid,
                target: targetCentroid,
                name: data[toId].properties.name,
                radius: 3,
                gain: -gain
            });

            // eliminate duplicates arcs
            if (pairs[pairKey]) {
                return;
            }

            pairs[pairKey] = true;

            arcs.push({
                target: gain > 0 ? targetCentroid : sourceCentroid,
                source: gain > 0 ? sourceCentroid : targetCentroid,
                value: flows[toId]
            });
        });

        // add point at arc target
        targets.push({
            ...value,
            position: [targetCentroid[0], targetCentroid[1], 10],
            net: value.gain + value.loss,
            name: county.properties.name
        });
    });

    // sort targets by radius large -> small
    targets.sort((a, b) => Math.abs(b.net) - Math.abs(a.net));
    const sizeScale = scaleLinear()
        .domain([0, Math.abs(targets[0].net)])
        .range([36, 400]);

    targets.forEach(pt => {
        pt.radius = Math.sqrt(sizeScale(Math.abs(pt.net)));
    });

    return {arcs, targets, sources};
}