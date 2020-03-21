import React from 'react';
import './App.css';
import AddInformMeasure from './containers/AddInformMeasure'
import MainMap from './components/MainMap'
import InformedStatus from './containers/InformedStatus';

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
            News Board
          </div>
          <MainMap/>
          <div className="interactionboard">
            Interaction Board
            <AddInformMeasure />
          </div>
        </div>
        <div className="footer">Statusinfo<InformedStatus></InformedStatus></div>
      </div> 
    );
  }
}

export default App;
