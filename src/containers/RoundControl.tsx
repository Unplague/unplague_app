import React from 'react';

import { connect } from 'react-redux';
import { store } from '..';
import { nextRound } from '../actions';
import logo_full from './../assets/logo_full.png'
import ProgressMeter from '../components/ProgressMeter';
import ActionQueue from '../components/ActionQueue';


const RoundControl = (props: any) => {
    if (props.round == 0) {
        return (
            <div className="info-container">


                <img onClick={() => { store.dispatch(nextRound()); }} src={logo_full} width="250px"></img>

                <h2><b>Welcome to the fight against Corona at unplague.de!</b></h2>
                <div>
                    The goal of Unplague is to <b>extend the time until 70% of the world population is infected</b> with the Corona virus. This is the only way to save the health system from overloading.
</div>
                <button onClick={() => { store.dispatch(nextRound()); }}>
                    <h2>Start Game</h2>
                </button>

                <div>
                    <i>Unplague was conceived and developed within less than 48 hours as part of the #wirvsvirus hackathon of the Federal Government in Germany. Do you like the idea? Then give us your like in the public voting on <a href="">YouTube</a>.</i>
                </div>

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
                        Ressources:
                    </div>
                    <div className="value">{props.money} <span className="tpp">🧻</span></div>
                </div>
                <div className="data">
                    <div className="round">
                        Overall Infection:
                    </div>
                    <div className="value">{Math.round(props.infectionRate * 100)}%</div>
                </div>
                <div className="data">
                    <ProgressMeter value={props.infectionRate} highIsGood={false}></ProgressMeter>
                </div>
                <div className="nextButton">
                    <ActionQueue actions={props.queuedActions}></ActionQueue>
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
        queuedActions: state.world.queuedActions,
    }
};
export default connect(mapStateToProps)(RoundControl);