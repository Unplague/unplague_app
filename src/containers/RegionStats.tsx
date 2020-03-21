import React from 'react';

import { Region } from '../model/Region';
import { connect } from 'react-redux';

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
                <p>Infection rate: {region.infectionRate}</p>
                <p>Happiness: {region.happiness}</p>
            </div>
        );
    }
};

const mapStateToProps: any = (state: any) => {
    return {
        region: state.world.selectedRegion
    }
};
export default connect(mapStateToProps)(RegionStats);