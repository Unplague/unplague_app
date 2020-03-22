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
import EndScreen from './containers/EndScreen';


interface MyProps {

}

interface MyState {
  lat: any,
  lng: any,
  zoom: any,
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
    if (this.state.lat) {
      position = [this.state.lat, this.state.lng];
      regions = this.state.regions;
    }

    return (
      <div className="app">
        <div className="header">
          <div className="center">Unplague</div>
          <div className="right"></div>
        </div>
        <div className="content">
          <div className="interactionboard eventboard">
          <div className="innerboard"><RoundControl /></div>
          <div className="innerboard"><EventFeed /></div>
          </div>
          {/* <RegionList /> */}
          <MainMap regions={regions} />
          <div className="interactionboard">
            <div className="innerboard">
              <RegionStats />
            </div>
            <div className="innerboard scollable"><ActionList /></div>

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
