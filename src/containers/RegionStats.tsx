import React from 'react';

import { store } from '../index';
import ProgressMeter from '../components/ProgressMeter';

function getTrendIndicator(infectionTrend: number) {
    switch (infectionTrend) {
        case 1: return "🔺";
        case 2: return "🔺🔺";
        case 3: return "🔺🔺🔺";
        default: return "";
    }
}

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
                No region selected
            </div>
        );
    } else {
        return (
            <div className="RegionStats board">
                <h3>{region.name}</h3>
                <p>Population: {Math.round(region.population / 1_000_000)} Mio.</p>
                <p>Infected: {getTrendIndicator(region.infectionTrend)} <span title="Keep the infection rate low continue the game." style={{color: "red"}}>⁉️</span></p>
                <ProgressMeter value={region.infectionRate} highIsGood={false}></ProgressMeter>
                <p>Happiness: <span title="Try to keep up the happiness of the population. Low happiness increases the costs of actions." style={{color: "red"}}>⁉️</span></p>
                <ProgressMeter value={region.happiness} highIsGood={true}></ProgressMeter>
                <p>Reproduction Rate:<br />{(region.reproductionRate * region.infectionModifier).toFixed(2)}</p>
            </div>
        );
    }
};

export default RegionStats;