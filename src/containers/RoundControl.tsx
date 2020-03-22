import React from 'react';

import { connect } from 'react-redux';
import { store } from '..';
import { nextRound } from '../actions';

const RoundControl = (props: any) => {
    if (props.round == 0) {
        return (
            <div className="start-button-container">
                <button onClick={() => {store.dispatch(nextRound());}}>
                    Start Game
                </button>
            </div>
        );
    } else {
        return (
            <p>
                Current round: {props.round} <br />
                Money: {props.money} ₮ <br />
                Overall Infecton: {Math.round(props.infectionRate*100)}% <br />
                <button onClick={() => store.dispatch(nextRound())}>
                    Next Round
                </button>
            </p>
        );
    }
};

const mapStateToProps: any = (state: any) => {
    return {
        round: state.world.round,
        money: state.world.money,
        infectionRate: state.world.overallInfectionRate,
    }
};
export default connect(mapStateToProps)(RoundControl);