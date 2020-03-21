import React from 'react';
import './App.css';
import MainMap from './components/MainMap'

class App extends React.Component {

  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  }

  dummyRegions = [{name: "Asia", population: 123123, infectionRate: .8, reproductionRate: .2, happiness: .1},
  {name: "North America", population: 123123, infectionRate: .2, reproductionRate: .2, happiness: .1},
  {name: "South America", population: 123123, infectionRate: .3, reproductionRate: .2, happiness: .1},
  {name: "Europe", population: 123123, infectionRate: .5, reproductionRate: .2, happiness: .1},
  {name: "Africa", population: 123123, infectionRate: .8, reproductionRate: .2, happiness: .1},
  {name: "Oceania", population: 123123, infectionRate: .04, reproductionRate: .2, happiness: .1},
  {name: "Australia", population: 123123, infectionRate: .03, reproductionRate: .2, happiness: .1}]

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="app">
        <div className="header">Coronafighter</div>
        <div className="body">
          <div className="newsboard">
            News Board
          </div>
          <MainMap regions={this.dummyRegions}/>
          <div className="interactionboard">
            Interaction Board
          </div>
        </div>
        <div className="footer">Statusinfo</div>
      </div> 
    );
  }
}

export default App;
