import React from 'react';
import './App.sass';
import MainMap from './components/MainMap'
import HelpModal from './components/HelpModal'

import EventFeed from './containers/EventFeed'
import ActionList from './containers/ActionList';
import RegionStats from './containers/RegionStats';
import RoundControl from './containers/RoundControl';

import { store } from './index';
import EndScreen from './containers/EndScreen';

import wvw_logo from './assets/wvw_logo.png'
import logo_full_2 from './assets/logo_full_2.png'

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
          <div className="left"></div>
          <div className="center">
            <span className="title">unplague</span>
          </div>
          <div className="right">
            <a href="#open-modal">HowTo Play</a>
          </div>
        </div>
        <div className="content">
          <HelpModal/>
          <div className="interactionboard eventboard">
          <div className="innerboard roundboard"><RoundControl /><EndScreen/></div>
          <div className="innerboard scrollable"><EventFeed /></div>
          </div>
          {/* <RegionList /> */}
          <MainMap regions={regions} />
          <div className="interactionboard">
            <div className="innerboard regionboard">
              <RegionStats />
            </div>
            <div className="innerboard scrollable"><ActionList /></div>

          </div>
        </div>
        <div className="footer">
          <div className="left">
            <a href="#">
              <img src={wvw_logo} width="250px"></img>
            </a>
          </div>
          <div className="center">
            <div>
              <a href="https://wirvsvirushackathon.org/" target="_blank">
                #WirVsVirus Hackathon
              </a>
            </div>
            <div>
              <a href="https://devpost.com/software/coronafighter" target="_blank">
                DEVPOST Project
              </a>
            </div>
            <div>
              <a href="https://github.com/Unplague/unplague_app" target="_blank">
                GitHub Project
              </a>
            </div>
            <div>
              <a href="https://www.youtube.com/watch?v=5yFiKWATnWE" target="_blank">
                YouTube
              </a>
            </div>
          </div>
          <div className="right">
              <img src={logo_full_2} ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
