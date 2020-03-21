import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet-css';

class MainMap extends React.Component {

    state = {
        lat: 0,
        lng: 0,
        zoom: 2
    }

  render() {
    const position: LatLngTuple = [this.state.lat, this.state.lng];
    return (
        <Map bounds={[[-90, -180],[90, 180]]}
          noWrap={true} dragging={false} center={position} zoom={this.state.zoom} minZoom={this.state.zoom} maxZoom={this.state.zoom}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
            />
            <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
            </Marker>
        </Map>
    );
  }
}

export default MainMap;
