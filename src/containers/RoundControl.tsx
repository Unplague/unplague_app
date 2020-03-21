import React from 'react';

import { connect } from 'react-redux';
import { store } from '..';
import { nextRound } from '../actions';

const RoundControl = (props: any) => {
    if (props.round == 0) {
        return (
            <button onClick={() => store.dispatch(nextRound())}>
                Start Game
            </button>
        );
    } else {
        return (
            <p>
                Current round: {props.round}
                <button onClick={() => store.dispatch(nextRound())}>
                    Next Round
                </button>
            </p>
        );
    }
};

const mapStateToProps: any = (state: any) => {
    return {
        round: state.world.round
    }
};
export default connect(mapStateToProps)(RoundControl);