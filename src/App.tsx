import React from 'react';
import './App.css';
import MainMap from './components/MainMap'

import NewsFeed from './components/NewsFeed/NewsFeed'

class App extends React.Component {

  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="app">
        <div className="header">Coronafighter</div>
        <div className="content">
          <div className="newsboard">
            <NewsFeed/>
          </div>
          <MainMap/>
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
