import React from 'react';

import { Region } from '../model/Region';
import { connect } from 'react-redux';

import '../components/RegionStats.css';

const RegionStats = (props: any) => {
    let region:Region = props.region;
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
                <p>Population: {region.population}</p>
                <p>Infected: {Math.round(region.population * region.infectionRate)}</p>
                <progress max="100" value={region.infectionRate * 100} data-label={Math.round(region.infectionRate * 100) + " % "}></progress>
                <p>Happiness:</p>
                <progress className="happiness" max="100" value={region.happiness * 100} data-label={Math.round(region.happiness * 100) + " % "}></progress>
            </div>
        );
    }
};

const mapStateToProps: any = (state: any) => {
    return {
        region: state.world.regions[state.world.selectedRegion]
    }
};
export default connect(mapStateToProps)(RegionStats);