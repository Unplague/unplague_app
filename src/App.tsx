import React from 'react';
import './App.css';
import AddInformMeasure from './containers/AddInformMeasure'
import MainMap from './components/MainMap'
import InformedStatus from './containers/InformedStatus';

import EventFeed from './containers/EventFeed/EventFeed'
import ActionList from './containers/Actions/ActionList';

import { store } from './index';



class App extends React.Component {

  constructor(props: any) {
    super(props);

    let unsubscribe = store.subscribe(this.handleRegionChange);
  }

  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  }

  handleRegionChange(): void {
    console.log(store.getState())
    console.log("fghsfdghsdfg")
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
        <div className="content">
          <div className="eventboard">
            <EventFeed/>
          </div>
          <MainMap regions={this.dummyRegions}/>
          <div className="interactionboard">
            Interaction Board
            <ActionList />
          </div>
        </div>
        <div className="footer">Statusinfo<InformedStatus></InformedStatus></div>
      </div> 
    );
  }
}

export default App;
