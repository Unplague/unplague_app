import React from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet-css';
import continents from '../data/continents.json';

class MainMap extends React.Component {

    state = {
        lat: 0,
        lng: 0,
        zoom: 1
    }

    position: LatLngTuple = [this.state.lat, this.state.lng];

    map = <Map 
            bounds={[[-90, -180],[90, 360]]} 
            dragging={false}
            center={this.position} 
            zoom={this.state.zoom}
            minZoom={this.state.zoom} 
            maxZoom={this.state.zoom}
            onresize={this.updateMapSize}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
            noWrap={true} 
            />
        <GeoJSON data={continents as any}></GeoJSON>
        </Map>

    updateMapSize(evt: any) {
        console.log(evt)
    }

    render() {
        window.addEventListener('resize', this.updateMapSize);
        return (this.map);
  }
}

export default MainMap;
