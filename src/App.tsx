import React from 'react';
import './App.sass';
import AddInformMeasure from './containers/AddInformMeasure'
import MainMap from './components/MainMap'
import InformedStatus from './containers/InformedStatus';

import EventFeed from './containers/EventFeed/EventFeed'
import ActionList from './containers/Actions/ActionList';
import RegionStats from './containers/RegionStats';
//import RegionList from './containers/RegionList';
import RoundControl from './containers/RoundControl';

import { store } from './index';


interface MyProps {
  
}

interface MyState {
  lat: any,
  lng: any,
  zoom:any,
  regions: any
}

class App extends React.Component<MyProps, MyState> {

  constructor(props: any) {
    super(props); 

    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
      regions: []
    }

    this.handleRegionChange = this.handleRegionChange.bind(this);
    let unsubscribe = store.subscribe(this.handleRegionChange);
  }

  handleRegionChange(): void {
    console.log(store.getState().world.regions)
    console.log("fghsfdghsdfg")

    this.setState({
      regions: store.getState().world.regions
    })

  }

  render() {
    console.log(this.state)
    let position = [0, 0]
    let regions = [];
    if(this.state.lat) {
      position = [this.state.lat, this.state.lng];
      regions = this.state.regions;
    }

    return (
      <div className="app">
        <div className="header">Unplague</div>
        <div className="content">
          <div className="eventboard board">
            <EventFeed/>
          </div>
          {/* <RegionList /> */}
          <MainMap regions={regions}/>
          <div className="interactionboard">
            <RegionStats />
            <ActionList />
          </div>
        </div>
        <div className="footer">
          <RoundControl />
          <InformedStatus></InformedStatus></div>
      </div> 
    );
  }
}

export default App;
