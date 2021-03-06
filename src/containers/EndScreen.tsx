import React from 'react';

import { connect } from 'react-redux';


const EndScreen = (props: any) => {
    if (props.gameEnded && props.won) {
        return (
            <div className="info-container">
                <div><h2>Congratulations</h2></div>
                <div>You have successfully contained the virus</div>
                <div>
                    Overall Infection: {Math.round(props.infectionRate*100)}% <br />
                    Rounds played: {props.round} <br />
                    Ressources: {props.money} 🧻 <br />
                </div>

                <button onClick={() => window.location.reload()}>
                    <h2>Restart Game</h2>
                </button>

                <div>
                <i>Unplague was conceived and developed within less than 48 hours as part of the #wirvsvirus hackathon of the Federal Government in Germany. Do you like the idea? Then give us your like in the public voting on <a href="https://www.youtube.com/watch?v=5yFiKWATnWE">YouTube</a>.</i>
                </div>

            </div>
        );
    } else if (props.gameEnded && !props.won) {
        return (
            <div className="info-container">
                <div><h2>Game Over</h2></div>
                <div>You have surpassed the world infection rate of 70%</div>
                <div>
                    Overall Infection: {Math.round(props.infectionRate*100)}% <br />
                    Rounds played: {props.round} <br />
                    Ressources: {props.money} 🧻 <br />
                </div>

                <button onClick={() => window.location.reload()}>
                    <h2>Restart Game</h2>
                </button>

                <div>
                <i>Unplague was conceived and developed within less than 48 hours as part of the #wirvsvirus hackathon of the Federal Government in Germany. Do you like the idea? Then give us your like in the public voting on <a href="https://www.youtube.com/watch?v=5yFiKWATnWE">YouTube</a>.</i>
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
        won: state.world.won,
    }
};
export default connect(mapStateToProps)(EndScreen);