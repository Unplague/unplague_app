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
            <div>
                <div>
                    Current round: {props.round}
                </div>
                <div>
                <button onClick={() => store.dispatch(nextRound())}>
                    Next Round
                </button>
                </div>
                <div>
                Money: {props.money} ₮
                </div>
            </div>
        );
    }
};

const mapStateToProps: any = (state: any) => {
    return {
        round: state.world.round,
        money: state.world.money,
    }
};
export default connect(mapStateToProps)(RoundControl);