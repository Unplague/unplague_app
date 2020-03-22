import React from 'react';

import { connect } from 'react-redux';


const EndScreen = (props: any) => {
    if (props.gameEnded ) {
        return (
            <div className="end-screen">
                <h2>Game Over</h2>
                <p>You have surpassed the world infection rate of 70%</p>
                <p>
                    Overall Infecton: {Math.round(props.infectionRate*100)}% <br />
                    Rounds played: {props.round} <br />
                    Money: {props.money} ₮ <br />
                </p>
                <button onClick={() => window.location.reload()}>
                    Restart Game
                </button>
            </div>
        );
    } else {
        return <div></div>;
    }
};

const mapStateToProps: any = (state: any) => {
    return {
        round: state.world.round,
        gameEnded: state.world.gameEnded,
        money: state.world.money,
        infectionRate: state.world.overallInfectionRate,
    }
};
export default connect(mapStateToProps)(EndScreen);