import React from 'react';
import './App.sass';
import MainMap from './components/MainMap'

import EventFeed from './containers/EventFeed'
import ActionList from './containers/ActionList';
import RegionStats from './containers/RegionStats';
import RoundControl from './containers/RoundControl';

import { store } from './index';
import EndScreen from './containers/EndScreen';


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
    this.setState({
      regions: store.getState().world.regions
    })

  }

  render() {
    let position = [0, 0]
    let regions = [];
    if(this.state.lat) {
      position = [this.state.lat, this.state.lng];
      regions = this.state.regions;
    }

    return (
      <div className="app">
        <div className="header">
          <div className="left board"><RoundControl /> <EndScreen/></div>
          <div className="center">Unplague</div>
          <div className="right"></div>
        </div>
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
          <div className="left">Left</div>
          <div className="center">Center</div>
          <div className="right">Right</div>
        </div>
      </div> 
    );
  }
}

export default App;
