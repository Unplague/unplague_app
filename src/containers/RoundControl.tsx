import React from 'react';

import { connect } from 'react-redux';
import { store } from '..';
import { nextRound } from '../actions';
import logo_full from './../assets/logo_full.png'


const RoundControl = (props: any) => {
    if (props.round == 0) {
        return (
            <div className="info-container">
                <img src={logo_full} width="250px"></img>
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
                        Current round:
                    </div>
                    <div className="value">{props.round}</div>
                </div>
                <div className="data">
                    <div className="round">
                    Overall Infecton:
                    </div>
                    <div className="value">{Math.round(props.infectionRate*100)}%</div>
                </div>
                <div className="data">
                    <div className="round">
                    Money:
                    </div>
                    <div className="value">{props.money} ₮</div>
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