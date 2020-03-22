import React from 'react';

import { connect } from 'react-redux';


const EndScreen = (props: any) => {
    if (props.gameEnded ) {
        return (
            <div className="info-container">
                <div><h2>Game Over</h2></div>
                <div>You have surpassed the world infection rate of 70%</div>
                <div>
                    Overall Infecton: {Math.round(props.infectionRate*100)}% <br />
                    Rounds played: {props.round} <br />
                    Ressources: {props.money} 🧻 <br />
                </div>
                    
                <div>
                <button onClick={() => window.location.reload()}>
                    Restart Game
                </button>
                </div>
                <div>
                <i>Unplague was conceived and developed within less than 48 hours as part of the #wirvsvirus hackathon of the Federal Government in Germany. Do you like the idea? Then give us your like in the public voting on <a href="">YouTube</a>.</i>
                </div>

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