import React from 'react';

import { Region } from '../model/Region';
import { connect } from 'react-redux';

import '../components/RegionStats.css';
import { store } from '../index';

const RegionStats = () => {
    let region = undefined;
    let regionId = store.getState().world.selectedRegion;

    if(regionId !== undefined && regionId >= 0) {
        // Get current region if available
        region = store.getState().world.regions[regionId];
    }

    if (region === undefined) {
        return (
            <div className="RegionStats">
                no region selected
            </div>
        );
    } else {
        return (
            <div className="RegionStats">
                <h4>{region.name}</h4>
                <p>Population: {Math.round(region.population / 1_000_000)} Mio.</p>
                <p>Infected:</p>
                <progress max="100" value={region.infectionRate * 100} data-label={Math.round(region.infectionRate * 100) + " % "}></progress>
                <p>Happiness:</p>
                <progress className="happiness" max="100" value={region.happiness * 100} data-label={Math.round(region.happiness * 100) + " % "}></progress>
                <p>Reproduction Rate: <br />{(region.reproductionRate * region.infectionModifier).toFixed(2)}</p>
            </div>
        );
    }
};

export default RegionStats;