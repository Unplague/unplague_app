import React from 'react';

import { connect } from 'react-redux';
import { store } from '..';
import { nextRound } from '../actions';

const RoundControl = (props: any) => {
    if (props.round == 0) {
        return (
            <div className="info-container">
                <button onClick={() => {store.dispatch(nextRound());}}>
                    Start Game
                </button>
            </div>
        );
    } else {
        return (
            <div className="stats">
                <div className="data">
                    <div className="round">
                        Current Round:
                    </div>
                    <div className="value">{props.round}</div>
                </div>
                <div className="data">
                    <div className="round">
                    Overall Infection:
                    </div>
                    <div className="value">{Math.round(props.infectionRate*100)}%</div>
                </div>
                <div className="data">
                    <div className="round">
                    Ressources:
                    </div>
                    <div className="value">{props.money} <span className="tpp">🧻</span></div>
                </div>
                <div className="nextButton">
                <button onClick={() => store.dispatch(nextRound())}>
                    Next Round
                </button>
                </div>
            </div>
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